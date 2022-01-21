import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { EstoqueService } from '../../servicos/estoque.service';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-dialog-consulta',
  templateUrl: './dialog-consulta.component.html',
  styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit, AfterViewInit {

  externalData: any;
  desabilitarBotaoPesquisar: boolean = false;

  constructor(
    private estoqueService: EstoqueService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DialogConsultaComponent>,
  ) {
    this.externalData = data;
  }

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  mensagem: string = 'Pesquise o item';
  barcode: string = '';
  ngOnInit(): void {
    this.mensagem = 'Pesquise o item';

  }

  consultar() {
    try {
      if (this.barcode !== '') {
        this.barcodeScanner.stop();
        if (String(this.externalData).indexOf('retornaBarcode') > -1) {
          this.enviarBarcode()
        } else
          if (String(this.externalData).indexOf('consulta') > -1) {
            this.mensagem = 'Aguarde...';
            this.desabilitarBotaoPesquisar = true;
            this.estoqueService.sendGetRequestByCode(this.barcode)
              .subscribe((resultado: estoqueItens[]) => {
                if (resultado && resultado.length > 0 && resultado[0].barcode && resultado[0].barcode !== '' && resultado[0].barcode !== undefined) {
                  if (this.externalData === 'consulta') {
                    this.router.navigate([`/editaItem/${this.barcode}`], { relativeTo: this.route });
                  }
                  this.dialogRef.close(resultado[0]);
                  //if (this.externalData === 'consulta2')
                } else {
                  this.mensagem = 'Tente novamente...';
                  this.barcode = '';
                  this.desabilitarBotaoPesquisar = false;
                  this.barcodeScanner.start();
                }
              },
                error => {
                  this.utilsService.showError('');
                });
          }
      }
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }



  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  tentarNovamente() {
    this.barcodeScanner.start();
  }

  enviarBarcode() {
    this.dialogRef.close(this.barcode);
  }

  onValueChanges(result: any) {
    this.barcode = result.codeResult.code;
    if (String(this.externalData).indexOf('consulta') > -1) {
      this.consultar();
    } else if (this.externalData === 'retornaBarcode') {
      this.barcodeScanner.stop();
    }
  }

  onStarted(started: any) {
  }
}

