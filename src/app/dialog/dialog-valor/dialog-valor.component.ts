import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-valor',
  templateUrl: './dialog-valor.component.html',
  styleUrls: ['./dialog-valor.component.css']
})
export class DialogValorComponent implements OnInit {

  externalData: any;
  valor: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DialogValorComponent>,
  ) {
    this.externalData = data;
  }
  ngOnInit(): void {
  }

  enviar(){
    this.dialogRef.close(this.valor && this.valor.length > 0 ? this.valor : '1');
  }

}
