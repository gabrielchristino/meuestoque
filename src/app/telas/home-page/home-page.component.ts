import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';
import { EstoqueService } from 'src/app/servicos/estoque.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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
  }

  consultaPreco() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'consulta';

    const dialogRef = this.dialog.open(DialogConsultaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {

      });
  }

}
