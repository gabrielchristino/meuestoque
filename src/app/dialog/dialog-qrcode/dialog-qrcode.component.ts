import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-qrcode',
  templateUrl: './dialog-qrcode.component.html',
  styleUrls: ['./dialog-qrcode.component.css']
})
export class DialogQrcodeComponent implements OnInit {
  public textoQr: string = '';
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DialogQrcodeComponent>,
  ) {
    this.textoQr = data;
  }

  codigo: string = '';
  ngOnInit(): void {
  }

  onCodeResult(resultString: any) {
    this.codigo = resultString;
    this.dialogRef.close(this.codigo);
  }

}
