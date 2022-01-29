import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuaggaJSConfigObject } from '@ericblade/quagga2';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { DialogConfirmComponent } from 'src/app/dialog/dialog-confirm/dialog-confirm.component';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;

  habilitarCamera: boolean = false;
  habilitarTeclado: boolean = false;

  configuracao: any = {
    camera: '',
    cameras: []
  }

  cameraSelecionada: any;


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
    this.habilitarCamera = this.estoqueService.habilitarCamera == 'true';
    this.habilitarTeclado = this.estoqueService.habilitarTeclado == 'true';;
    if (this.habilitarCamera && this.cameraSelecionada) {
      setTimeout(() => {
        this.barcodeScanner.start();
      }, 1000);
    }

  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.estoqueService.cookieCamera) {
      this.cameraSelecionada = this.estoqueService.cookieCamera;
    }
    this.getCameras();
  }

  getCameras() {
    let index: number = 1;
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
          if (this.configuracao.cameras.length > 0 && !this.cameraSelecionada) {
            this.cameraSelecionada = this.configuracao.cameras[0].deviceId;
            this.enableCamera(this.cameraSelecionada);
          }
          this.isLoading = false;
        });
      })
      .catch(function (err) { });
  }

  enableCamera(deviceId: any) {
    if (this.cameraSelecionada) {
      setTimeout(() => {
        this.cameraSelecionada = deviceId;
        this.barcodeScanner.start();
      }, 1000);
    } else {
      this.barcodeScanner.stop();
    }
  }

  setCamera(evento: any) {
    this.barcodeScanner.stop();
    setTimeout(() => {
      this.cameraSelecionada = evento.value;
      this.barcodeScanner.start();
    }, 1000);

  }

  salvarItem() {
    // this.isLoading = true;
    // this.isLoading = false;
    this.estoqueService.cookieCamera = this.cameraSelecionada;
    this.estoqueService.habilitarCamera = this.habilitarCamera;
    this.estoqueService.habilitarTeclado = this.habilitarTeclado;
  }

  limparDados() {

    try {
      this.isLoading = true;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.estoqueService.cookieCamera = '';
            this.estoqueService.habilitarCamera = '';
            this.estoqueService.habilitarTeclado = '';
            this.estoqueService.avisosLidos = '';
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        }
      );
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  onValueChanges(result: any) {
    this.resultado = result.codeResult.code;
  }

  apagarConta() {
    try {
      this.isLoading = true;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.apagarLoja();
          } else {
            this.isLoading = false;
          }
        }
      );
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  apagarLoja() {
    this.estoqueService.sendDeleteLojaRequest()
      .subscribe((loja: any) => {
        this.apagarEstoque();
      });
  }

  apagarEstoque() {
    this.estoqueService.sendGetRequest()
      .subscribe((itensEstoque: any[]) => {
        if (itensEstoque.length > 0) {
          this.estoqueService.sendDeleteEstoqueRequest()
            .subscribe((estoque: any) => {
              this.apagarUsuario();
            });
        } else {
          this.apagarUsuario();
        }
      });
  }

  apagarUsuario() {
    this.estoqueService.sendDeleteUserRequest()
      .subscribe((usuario: any) => {
        this.estoqueService.cookieCamera = '';
        this.estoqueService.habilitarCamera = '';
        this.estoqueService.habilitarTeclado = '';
        this.estoqueService.avisosLidos = '';
        this.isLoading = false;
        location.reload();
        this.estoqueService.socialAuthServiceRevoke();
      });
  }
}
