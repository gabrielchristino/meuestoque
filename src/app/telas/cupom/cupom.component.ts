import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAlertComponent } from '../../dialog/dialog-alert/dialog-alert.component';
import { DialogErrorComponent } from '../../dialog/dialog-error/dialog-error.component';
import { EstoqueService } from '../../servicos/estoque.service';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { UtilsService } from 'src/app/servicos/utils.service';
import { venda } from 'src/app/compartilhado/models/venda.model';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent implements OnInit, AfterViewInit {
  emailCliente: string = '';
  dados: any;
  valorTotal: any;
  cpfCliente: any = '';
  telefoneCliente: any;
  myDate = new Date();
  isLoading: boolean = false;
  cupomArquivo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public estoqueService: EstoqueService,
    public dialog: MatDialog,
    private utilsService: UtilsService
  ) {
    try {
      this.dados = this.router.getCurrentNavigation()!.extras.state!.venda || {};
      this.valorTotal = this.router.getCurrentNavigation()!.extras.state!.valorTotal || {};
      this.cpfCliente = this.router.getCurrentNavigation()!.extras.state!.cpf || 'Não solicitado';
    } catch {
      this.router.navigate([`/`], { relativeTo: this.route, skipLocationChange: true });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let htmlVazio: any;

      // htmlToImage.toBlob(document.getElementById('print-section') || htmlVazio)
      //   .then((dataUrl) => {
      //     this.cupomArquivo = dataUrl;
      //   });
      const vendaRequest: venda = {
        loja: this.estoqueService.usuario.idLoja,
        dataora: String(new Date()),
        vendedor: this.estoqueService.user.email,
        cupom: String(document.getElementById('print-section')?.innerText)
      }
      this.estoqueService.sendPostVendasRequest(vendaRequest)
      .subscribe((venda)=>{

      });

      htmlToImage.toPng(document.getElementById('print-section') || htmlVazio)
        .then((dataUrl) => {
          this.cupomArquivo = dataUrl;
          (document.getElementById('print-section') || htmlVazio).innerHTML =
            `<div id="print-section" >
        <img src='${dataUrl}' style=
        'margin: 0;
        width: 100%;
        max-width: 600px;
        display: block;'>
        </div>
        `;
        });

        // htmlToImage.toBlob(document.getElementById('print-section') || htmlVazio)
        // .then((blob) => {

        // });



    }, 0);

  }

  ngOnInit(): void {
    this.estoqueService.compraFechada = true;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  imprimirCupom() {
    // this.estoqueService.compraFechada = true;
    // this.showError('Impresso com sucesso!', 'novaVenda');
  }
  enviarEmail() {
    // let htmlVazio: any;
    // const filesArray = [
    //   new File(
    //     [this.cupomArquivo],
    //     'cupomCliente.jpg',
    //     {
    //       type: "image/jpeg",
    //       lastModified: new Date().getTime()
    //     }
    //   )
    // ];
    // const shareData = {
    //   files: filesArray,
    //   title: 'Cupom',
    //   text: 'Segue seu cupom.',
    // };
    // navigator.share(shareData);

    let corpoEmail: string = `mailto:${this.emailCliente}?subject=Bem vindo a ${this.estoqueService.loja.name}&body=<p>Obrigado por comprar com a gente!</p><img src\"${this.cupomArquivo}\">`;
    window.open(encodeURI(corpoEmail), '_blank');
    // this.estoqueService.sendEmail(document.getElementById('print-section') || htmlVazio, this.emailCliente)
    //   .subscribe((resultado: any) => {
    //     // this.showError('Enviado email com sucesso!', 'novaVenda');
    //     // this.estoqueService.compraFechada = true;
    //   },
    //     error => {
    //       this.showError('');
    //     });
    // let htmlVazio: any;


    // htmlToImage.toPng(document.getElementById('print-section')||htmlVazio)
    // .then((dataUrl) => {
    //   (document.getElementById('print-section2')||htmlVazio).innerHTML =
    //     `
    //     <img src='${dataUrl}'>
    //     `
    //   ;
    //   this.sendMail( "<img src='"+dataUrl+"'>");
    // });
    //https://www.npmjs.com/package/html-to-image#toJpeg


  }

  exibirAlerta(resultado: string) {
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogAlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
      });
  }



  substring(texto: string, tamanho: number) {
    if (String(texto).length > tamanho) {
      return String(texto).substring(0, tamanho)
    }
    while (String(texto).length < tamanho) {
      texto = " " + texto;
    }
    return String(texto);
  }
  substringNumber(texto: string, tamanho: number) {
    texto = String(Number(texto).toFixed(2));
    if (String(texto).length > tamanho) {
      return String(texto).substring(0, tamanho)
    }
    while (String(texto).length < tamanho) {
      texto = " " + texto;
    }
    return String(texto);
  }
  substringItem(texto: string, tamanho: number) {
    if (String(texto).length > tamanho) {
      return String(texto).substring(0, tamanho)
    }
    while (String(texto).length < tamanho) {
      texto = "0" + texto;
    }
    return String(texto);
  }

  formataCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.length < 12 ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  removeAcento (texto:string):string {
    texto = texto.toLowerCase();
    texto = texto.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    texto = texto.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    texto = texto.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    texto = texto.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    texto = texto.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    texto = texto.replace(new RegExp('[Ç]','gi'), 'c');
    return texto;
}
}
