import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { venda } from 'src/app/compartilhado/models/venda.model';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-exibir-vendas',
  templateUrl: './exibir-vendas.component.html',
  styleUrls: ['./exibir-vendas.component.css']
})
export class ExibirVendasComponent implements OnInit {

  public isLoading: boolean = false;
  public vendas: venda[] = [];
  telefoneCliente: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estoqueService: EstoqueService,
    public dialog: MatDialog,
    private utilsService: UtilsService
  ) { }



  ngOnInit(): void {
    this.isLoading = true;
    this.estoqueService.sendGetVendasRequest()
      .subscribe((vendas: venda[]) => {
        this.vendas = vendas;
        this.isLoading = false;
      });
  }

  substr(valor: String = ' sem cupom'): String {
    return String(valor).substring(0, 1) === ' ' ? String(valor).substring(1) : String(valor);
  }

  enviarWA(venda: venda) {

    this.estoqueService.getCupom(String(venda.datahora))
      .subscribe((downloadUrl: string) => {
        // const arquivoUrl: string = `https://firebasestorage.googleapis.com/v0/b/meuestoque-7f9dc.appspot.com/o/lojas%2F${String(venda.loja)}%2F${String(venda.datahora)}?alt=media`;
        window.open(`https://api.whatsapp.com/send?phone=55${this.telefoneCliente}&text=${encodeURI(`Olá segue seu cupom! Ele ficará disponível por 30 dias\n${downloadUrl}`)}`, '_blank');
      }, (error: any) => {
        let htmlVazio: any;
        htmlToImage.toBlob(document.getElementById('print-section'+String(venda.datahora)) || htmlVazio, { backgroundColor: 'white' })
          .then((blobFile: any) => {
            this.estoqueService.salvaCupom(blobFile, String(venda.datahora))
              .subscribe((downloadUrl: string) => {
                window.open(`https://api.whatsapp.com/send?phone=55${this.telefoneCliente}&text=${encodeURI(`Olá segue seu cupom! Ele ficará disponível por 30 dias\n${downloadUrl}`)}`, '_blank');
              });
          });
      });
  }

  compartilhar() {
    const shareData = {
      title: 'Cupom',
      text: String(document.getElementById('print-section')?.innerText),
    };
    navigator.share(shareData);
  }
}
