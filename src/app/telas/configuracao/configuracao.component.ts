import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuaggaJSConfigObject } from '@ericblade/quagga2';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  isLoading: boolean = false;

  configuracao: any = {
    camera: '',
    cameras: []
  }



  resultado: string = '';

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  public config: QuaggaJSConfigObject = {
    frequency: 3,
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
    public dialog: MatDialog,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.getCameras();
  }

  getCameras() {

    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            this.configuracao.cameras.push(device);
          }
        });
        this.configuracao.camera = this.estoqueService.cookieCamera;
        if(this.configuracao.camera !== undefined && this.configuracao.camera !== '') {
          this.setCamera();
        }
      })
      .catch(function (err) { });
  }

  setCamera(){
    this.estoqueService.cookieCamera = this.configuracao.camera;
    this.barcodeScanner.stop();
    this.barcodeScanner.start();
  }

  salvarItem() {

    this.isLoading = true;
    this.isLoading = false;
  }

  onValueChanges(result: any) {
    this.resultado = result.codeResult.code;
  }
}
