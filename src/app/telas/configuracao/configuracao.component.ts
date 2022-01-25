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
    camera: []
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
    let backCamID: any = null;
    let last_camera: any = null;
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind == "videoinput" && device.label.match(/back/) !== null) {
            backCamID = device.deviceId;
            console.log('back', device);
          }
          if (device.kind === "videoinput") {
            last_camera = device.deviceId;
            console.log('camera', device);
            this.configuracao.camera.push(device);
          }
        });
        if (backCamID === null) {
          backCamID = last_camera;
        }
      })
      .catch(function (err) { });
  }

  salvarItem() {
    this.isLoading = true;
    this.isLoading = false;
    this.barcodeScanner.start();

  }

  onValueChanges(result: any) {
    this.resultado = result.codeResult.code;
  }
}
