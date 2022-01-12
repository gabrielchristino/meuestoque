import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }


  exibirAlerta(){
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
