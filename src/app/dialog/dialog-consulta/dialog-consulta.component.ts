import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../../servicos/estoque.service';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UtilsService } from 'src/app/servicos/utils.service';
import { QuaggaJSConfigObject } from '@ericblade/quagga2';

@Component({
  selector: 'app-dialog-consulta',
  templateUrl: './dialog-consulta.component.html',
  styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit, AfterViewInit {

  externalData: any;
  desabilitarBotaoPesquisar: boolean = false;

  median: number = 0.1;
  threshold: number = 0;
  habilitarCamera: boolean = false;

  // barcodeTypes: string[] = ['code_128','code_39','code_39_vin','ean','ean_extended','ean_8','upc','upc_e','codabar','i2of5','2of5','code_93']

  public config: QuaggaJSConfigObject = {
    frequency: 5,
    debug: true,
    decoder: {
      debug: {
        drawBoundingBox: true,
        drawScanline: true,
        showPattern: true
      }
    },
    locator: {
      patchSize: 'x-large',
      debug: {
        showCanvas: true,
        showSkeleton: true,
        showLabels: true,

      }
    }
  }

  constructor(
    public estoqueService: EstoqueService,
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
    this.habilitarCamera = this.estoqueService.habilitarCamera == 'true';
  }

  consultar() {
    try {
      this.stopCamera();
      if (this.barcode !== '') {
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
                    this.router.navigate([`/editaItem/${this.barcode}`], { relativeTo: this.route, skipLocationChange: true });
                  }
                  this.dialogRef.close(resultado[0]);
                  //if (this.externalData === 'consulta2')
                } else {
                  this.mensagem = 'Tente novamente...';
                  this.barcode = '';
                  this.desabilitarBotaoPesquisar = false;
                  this.startCamera();
                }
              },
                error => {
                  this.utilsService.showError('');
                });
          }
      } else {
        this.dialogRef.close();
      }
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }



  ngAfterViewInit() {
    this.startCamera();
  }

  tentarNovamente() {
    this.startCamera();
  }

  enviarBarcode() {
    this.stopCamera();
    this.dialogRef.close(this.barcode);
  }

  onValueChanges(result: any) {
    this.stopCamera();
    this.barcode = result.codeResult.code;
    if (String(this.externalData).indexOf('consulta') > -1) {
      this.consultar();
    } else if (this.externalData === 'retornaBarcode') {
      this.stopCamera();
    }
  }

  fecharModal(){
    this.stopCamera();
    this.dialogRef.close(this.barcode);
  }

  stopCamera() {
    if(this.habilitarCamera) this.barcodeScanner.stop();
  }

  startCamera() {
    if(this.habilitarCamera) this.barcodeScanner.start();
  }

  onStarted(started: any) {
  }
}

