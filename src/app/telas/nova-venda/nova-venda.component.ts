import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';
import { DialogErrorComponent } from '../../dialog/dialog-error/dialog-error.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogValorComponent } from '../../dialog/dialog-valor/dialog-valor.component';
import { Observable, of, throwError } from 'rxjs';
import { EstoqueService } from '../../servicos/estoque.service';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class novaVendaComponent implements OnInit {

  isLoading: boolean = false;
  displayedColumns: string[] = ['actions', 'description', 'items', 'price'];
  dataSource = new MatTableDataSource<estoqueItens>();

  itensLista: estoqueItens[] = [];

  valorTotal: number = 0;
  itemNumero: number = 1;


  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private estoqueService: EstoqueService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    if (this.estoqueService.listaCompra.data.length > 0 && !this.estoqueService.compraFechada) {
      this.itensLista = this.estoqueService.listaCompra.data;

      this.valorTotal = 0;

      this.itemNumero = 1;
      this.itensLista.forEach((produto, index) => {
        produto.item = this.itemNumero;
        this.valorTotal += (produto.items || 1) * (produto.price || 0);
        this.itemNumero += 1;
      });
      this.dataSource = new MatTableDataSource<estoqueItens>(this.itensLista);
      this.estoqueService.listaCompra = this.dataSource;
      this.isLoading = false;
    } else {
      this.estoqueService.compraFechada = false;
    }
  }

  removerItem(item: estoqueItens) {
    try {
      this.isLoading = true;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.valorTotal = 0;

            this.itensLista = this.itensLista.filter((produto, index) => {
              return !(produto.barcode === item.barcode && produto.item === item.item);
            });
            this.itemNumero = 1;
            this.itensLista.forEach((produto, index) => {
              produto.item = this.itemNumero;
              this.valorTotal += (produto.items || 1) * (produto.price || 0);
              this.itemNumero += 1;
            });
            this.dataSource = new MatTableDataSource<estoqueItens>(this.itensLista);
            this.estoqueService.listaCompra = this.dataSource;
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

  exibirAlerta() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'consulta2';

    const dialogRef = this.dialog.open(DialogConsultaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          dialogConfig.data = {
            mensagem: 'Informe a quantidade ou aperte Enter para 1 item', campo: 'Quantidade', tipo: 'number', exemplo: 'Ex. 1', btn1: ' itens', btn2: { texto: '1 item', valor: '1' }
          }
          dialogConfig.autoFocus = true;
          const dialogRef2 = this.dialog.open(DialogValorComponent, dialogConfig);
          dialogRef2.afterClosed().subscribe(
            resultado => {
              data.items = resultado;
              data.item = this.itemNumero;
              data.totalPrice = data.items * data.price;
              this.itensLista.push(data);
              this.valorTotal += data.items * data.price;
              this.dataSource = new MatTableDataSource<estoqueItens>(this.itensLista);
              this.estoqueService.listaCompra = this.dataSource;
              this.itemNumero += 1;
            },
            error => {
              this.utilsService.showError('');
            });
        } else {
          this.isLoading = false;
        }
      });
  }

  fecharCompra() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      mensagem: 'Informe o CPF/CNPJ do cliente', campo: 'CPF/CNPJ', tipo: 'text', exemplo: 'CPF/CNPJ', btn1: '', btn2: { texto: 'Sem CPF/CNPJ', valor: ' >' }
    }
    dialogConfig.autoFocus = true;
    const dialogRef2 = this.dialog.open(DialogValorComponent, dialogConfig);
    dialogRef2.afterClosed().subscribe(
      resultado => {

        this.estoqueService.listaCompra = this.dataSource;
        this.dataSource = new MatTableDataSource<estoqueItens>();

        this.estoqueService.listaCompra.data.forEach((itemLista:estoqueItens)=>{
          this.estoqueService.sendGetRequestByCode(String(itemLista.barcode))
          .subscribe((dadosItem:estoqueItens[])=>{
            dadosItem[0].items = Number(dadosItem[0].items) - Number(itemLista.items);
            this.estoqueService.sendPutRequest(dadosItem[0])
            .subscribe((item:estoqueItens)=>{
              // console.log('ok');

            }, (error:string)=>{
              // console.log('nok');
            });
          });
        });

        this.router.navigate([`/cupomPage`], { relativeTo: this.route, skipLocationChange: true, state: { venda: this.itensLista, valorTotal: this.valorTotal, cpf: resultado } });

      },
      error => {
        this.utilsService.showError('');
      });

  }

}
