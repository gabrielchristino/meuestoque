import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { avisos } from 'src/app/compartilhado/models/avisos.model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public listaAvisos: avisos[] = [];
  public ThemePalette: ThemePalette;
  constructor(
    public dialog: MatDialog,
    public estoqueService: EstoqueService,
  ) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'n':
        this.estoqueService.navigateTo('novaVenda');
        break;
      case 'c':
        this.consultaPreco();
        break;
      case 'e':
        this.estoqueService.navigateTo('listaEstoque');
        break;

      default:
        break;
    }
  }
  ngOnInit(): void {
    this.estoqueService.sendGetAvisosRequest()
      .subscribe((avisos: avisos[]) => {
        if (this.estoqueService.avisosLidos) {
          this.listaAvisos = avisos.filter((aviso: avisos) => {
            return !this.estoqueService.avisosLidos?.includes(aviso._id);
          });
        } else {
          this.listaAvisos = avisos;
        }
      });
  }

  markAsRead(aviso: avisos) {
    this.estoqueService.avisosLidos = this.estoqueService.avisosLidos + ',' + aviso._id;
    this.listaAvisos = this.listaAvisos.filter((aviso: avisos) => {
      return !this.estoqueService.avisosLidos?.includes(aviso._id);
    });
  }

  consultaPreco() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = this.estoqueService.habilitarTeclado == 'true';
    dialogConfig.data = 'consulta';

    const dialogRef = this.dialog.open(DialogConsultaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {

      });
  }

}
