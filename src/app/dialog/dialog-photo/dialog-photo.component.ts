import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.css']
})
export class DialogPhotoComponent implements OnInit, AfterViewInit {
  public externalData: any;
  public photo: any;
  public streamCamera: any;

  public btnCaptura: string = 'Capturar foto';

  public exibirFoto: boolean = false;


  constructor(
    public dialog: MatDialog,
    private utilsService: UtilsService,
    public estoqueService: EstoqueService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DialogPhotoComponent>,
  ) {
    this.externalData = data;
  }

  @ViewChild('videoCamera')
  videoCamera!: any;

  @ViewChild('canvasPhoto')
  canvasPhoto!: any;

  @ViewChild('modalCaptura')
  public modalCaptura!: any;

  ngAfterViewInit(): void {
    let _video = this.videoCamera.nativeElement;

    setTimeout(() => {
      if (this.externalData) {
        this.btnCaptura = 'Capturar novamente';
        this.exibirFoto = true;
        this.photo = this.externalData;
      }
    }, 100);

    if (!this.externalData && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      const idCamera = this.estoqueService.cookieCamera;
      navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: this.estoqueService.cookieCamera } } })
        .then((stream: any) => {
          this.streamCamera = stream;
          _video.srcObject = stream;
          _video.play();
        });
    }

  }
  ngOnInit(): void {
    this.startCamera();
  }

  startCamera() {
  }

  takePhoto() {
    if (this.exibirFoto) {
      this.exibirFoto = false;

      setTimeout(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          let _video = this.videoCamera.nativeElement;
          navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: this.estoqueService.cookieCamera } } })
            .then((stream: any) => {
              this.streamCamera = stream;
              _video.srcObject = stream;
              _video.play();
              this.btnCaptura = 'Capturar foto';
            });
        }

      }, 100);
    } else {
      let _video = this.videoCamera.nativeElement;
      this.btnCaptura = 'Capturar novamente';
      _video.pause();
      let _canvasobj = this.canvasPhoto.nativeElement;
      _canvasobj.width = _video.offsetWidth;
      _canvasobj.height = _video.offsetHeight;
      _canvasobj.getContext('2d').drawImage(_video, 0, 0, _video.offsetWidth, _video.offsetHeight);
      let image_data_url = _canvasobj.toDataURL('image/jpeg');

      this.photo = image_data_url;
      this.exibirFoto = true;
    }
  }

  setPhoto() {
      this.streamCamera.getTracks()[0].stop();
      this.dialogRef.close(this.photo);
  }

}
