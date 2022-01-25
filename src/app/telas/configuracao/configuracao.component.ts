import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ConfiguracaoComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;

  configuracao: any = {
    camera: '',
    cameras: []
  }

  cameraSelecionada: string = '';


  resultado: string = '';

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

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
    public dialog: MatDialog,
    private utilsService: UtilsService,
  ) { }

  ngAfterViewInit(): void {
    if (this.estoqueService.cookieCamera) {
      this.cameraSelecionada = this.estoqueService.cookieCamera;
      this.barcodeScanner.start();
    }
  }

  ngOnInit(): void {
    this.getCameras();
  }

  getCameras() {
    let index:number = 1;
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            let camera = {
              deviceId: device.deviceId,
              label: `Camera ${index}`
            }
            this.configuracao.cameras.push(camera);
            index++;
          }
        });
      })
      .catch(function (err) { });
  }

  setCamera(evento: any) {
    this.cameraSelecionada = '';
    this.barcodeScanner.stop();
    this.cameraSelecionada = evento.value;
    this.barcodeScanner.start();
  }

  salvarItem() {
    // this.isLoading = true;
    // this.isLoading = false;
    this.estoqueService.cookieCamera = this.cameraSelecionada;
  }

  onValueChanges(result: any) {
    this.resultado = result.codeResult.code;
  }
}
