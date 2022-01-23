import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '@auth0/auth0-angular';
import { loja } from 'src/app/compartilhado/models/loja.model';
import { usuario } from 'src/app/compartilhado/models/usuario.model';
import { DialogQrcodeComponent } from 'src/app/dialog/dialog-qrcode/dialog-qrcode.component';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-cadastro-usuario-loja',
  templateUrl: './cadastro-usuario-loja.component.html',
  styleUrls: ['./cadastro-usuario-loja.component.css']
})
export class CadastroUsuarioLojaComponent implements OnInit {

  isLoading: boolean = false;
  dadosUsuario: usuario = new usuario;
  dadosLoja: loja = new loja;
  lojaExistente: boolean = false;
  atualizarCadastro: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public estoqueService: EstoqueService,
    public dialog: MatDialog,
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar,
    // public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.dadosUsuario.name = this.estoqueService.user.name;
    this.dadosUsuario.email = this.estoqueService.user.email;
    this.dadosUsuario._id = this.estoqueService.usuario._id;

    this.dadosLoja = this.estoqueService.loja !== undefined ? this.estoqueService.loja : new loja;

    this.atualizarCadastro = this.estoqueService.loja !== undefined && this.estoqueService.usuario !== undefined;
  }

  exibirQrCode() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.dadosLoja._id;

    const dialogRef = this.dialog.open(DialogQrcodeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data !== undefined && data !== '') {
          this.dadosLoja._id = data;
          this.carregarLoja();
        }
      });
  }

  carregarLoja() {
    if (this.dadosLoja._id !== undefined && this.dadosLoja._id !== '') {
      this.isLoading = true;
      this.estoqueService.sendGetLojaRequest(this.dadosLoja._id)
        .subscribe((loja: loja[]) => {
          if (loja.length > 0) {
            this.dadosLoja = loja[0];
            this.lojaExistente = true;
            this.isLoading = false;
          } else {
            this.dadosLoja._id = '';
            this.isLoading = false;
          }
        });
    }
  }

  salvarItem() {
    this.isLoading = true;
    if (this.atualizarCadastro) {
      this.estoqueService.sendPutLojaRequest(this.dadosLoja)
        .subscribe((loja) => {
          this.dadosUsuario.idLoja = loja._id;
          this.estoqueService.sendPutUserRequest(this.dadosUsuario)
            .subscribe((usuario) => {
              this.isLoading = false;
              this.utilsService.showError('Cadastro Atualizado com sucesso.', 'logoff');
            });
        });
    } else if (this.lojaExistente) {
      this.dadosUsuario.idLoja = this.dadosLoja._id;
      this.estoqueService.sendPostUserRequest(this.dadosUsuario)
        .subscribe((usuario) => {
          this.isLoading = false;
          this.utilsService.showError('Usuário cadastrado com sucesso! Faça seu login novamente para confirmar.', 'logoff');
        });
    } else {
      this.estoqueService.sendPostLojaRequest(this.dadosLoja)
        .subscribe((loja) => {
          this.dadosUsuario.idLoja = loja._id;
          this.estoqueService.sendPostUserRequest(this.dadosUsuario)
            .subscribe((usuario) => {
              this.isLoading = false;
              this.utilsService.showError('Usuário cadastrado com sucesso! Faça seu login novamente para confirmar.', 'logoff');
            });
        });
    }
  }

}
