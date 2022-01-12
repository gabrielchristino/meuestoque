import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    ) { }

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
