import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { EstoqueService } from '../../servicos/estoque.service';
import { DialogErrorComponent } from '../../dialog/dialog-error/dialog-error.component';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { estoqueItens } from '../../compartilhado/models/estoqueItens.model';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-estoque-lista',
  templateUrl: './estoque-lista.component.html',
  styleUrls: ['./estoque-lista.component.css']
})

export class EstoqueListaComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService
  ) { }
  isLoading: boolean = false;
  displayedColumns: string[] = ['actions', 'description', 'items', 'price'];
  dataSource = new MatTableDataSource<estoqueItens>();

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  ngOnInit(): void {
    this.carregarEstoque();
  }

  carregarEstoque() {
    try {
      this.isLoading = true;
      this.estoqueService.sendGetRequest()
        .subscribe((resultado: estoqueItens[]) => {
          if (resultado.length > 0) {
            this.dataSource = new MatTableDataSource<estoqueItens>(resultado);
          } else {
            this.utilsService.showError('Não há itens no estoque, cadastre um novo', 'novoItem');
          }
          this.isLoading = false;
        },
          error => {
            this.utilsService.showError('');
          });
    } catch (e) {
      this.utilsService.showError(String(e));
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
            this.estoqueService.sendDeleteRequest(item._id || '')
              .subscribe((resultado: estoqueItens[]) => {
                this.ngOnInit();
              },
                error => {
                  this.utilsService.showError('');
                });
          } else {
            this.isLoading = false;
          }
        }
      );
    } catch (e) {
      this.utilsService.showError(String(e));
    }
  }

  adicionarItem() {
    this.router.navigate([`/novoItem`], { relativeTo: this.route });
  }

}
