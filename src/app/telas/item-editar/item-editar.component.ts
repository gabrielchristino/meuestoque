import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { EstoqueService } from '../../servicos/estoque.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../dialog/dialog-alert/dialog-alert.component';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';
import { UtilsService } from 'src/app/servicos/utils.service';
import { DialogPhotoComponent } from 'src/app/dialog/dialog-photo/dialog-photo.component';

@Component({
  selector: 'app-item-editar',
  templateUrl: './item-editar.component.html',
  styleUrls: ['./item-editar.component.css']
})
export class ItemEditarComponent implements OnInit, OnChanges {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estoqueService: EstoqueService,
    public dialog: MatDialog,
    private utilsService: UtilsService
  ) { }

  isLoading: boolean = false;
  itemProduto!: estoqueItens;
  statusProduto: string = '';

  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    try {
      this.isLoading = true;
      this.route.params.subscribe(res => {
        if (res.barcode === '' || res.barcode === undefined) this.carregarProduto('');
        else this.carregarProduto(res.barcode)
      });
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  salvarItem() {
    try {
      this.isLoading = true;
      let barcode: string = '';
      this.route.params.subscribe(res => {
        barcode = res.barcode;
      });
      if (barcode !== '' && barcode !== undefined) {
        this.estoqueService.sendPutRequest(this.itemProduto)
          .subscribe((resultado: estoqueItens) => {
            this.exibirAlerta(resultado);
          },
            error => {
              this.utilsService.showError('');
            });
      } else {
        this.estoqueService.sendPostRequest(this.itemProduto)
          .subscribe((resultado: estoqueItens) => {
            this.exibirAlerta(resultado);
          },
            error => {
              this.utilsService.showError('');
            });
      }
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  exibirAlerta(resultado: estoqueItens) {
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogAlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.router.navigate([`/editaItem/${resultado.barcode}`], { relativeTo: this.route, skipLocationChange: true });
        this.carregarProduto(resultado.barcode || '');
      });
  }

  carregarProduto(barcode: string) {
    try {
      this.isLoading = true;
      if (barcode !== '') {
        this.estoqueService.sendGetRequestByCode(barcode)
          .subscribe((resultado: estoqueItens[]) => {
            if (resultado.length > 0) {
              this.itemProduto = resultado[0];
              this.statusProduto = 'Atualizar';
            } else {
              this.utilsService.showError('Produto não localizado, cadastre um novo', 'novoItem');
              this.iniciarNovoProduto();
            }
            this.isLoading = false;
          });
      } else {
        this.iniciarNovoProduto();
        this.isLoading = false;
      }
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  iniciarNovoProduto() {
    this.statusProduto = 'Novo produto';
    this.itemProduto = {
      barcode: '',
      description: '',
      additional: '',
      additional2: '',
      additional3: '',
      items: 0,
      price: 0.00,
      idLoja: this.estoqueService.usuario.idLoja
    };
  }

  openScanner() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = this.estoqueService.habilitarTeclado == 'true';
    dialogConfig.data = 'retornaBarcode';

    const dialogRef = this.dialog.open(DialogConsultaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.itemProduto.barcode = data;
        } else {
          this.isLoading = false;
        }
      });
  }

  takePhoto(photo: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = photo;

    const dialogRef = this.dialog.open(DialogPhotoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.itemProduto.photo = data;
        }
      });
  }

}
