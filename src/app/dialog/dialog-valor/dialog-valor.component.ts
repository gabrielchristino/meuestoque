import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { EstoqueService } from '../../servicos/estoque.service';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
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
    private estoqueService: EstoqueService,
    private router: Router,
    private route: ActivatedRoute,
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
