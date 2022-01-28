import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { venda } from 'src/app/compartilhado/models/venda.model';
import { EstoqueService } from 'src/app/servicos/estoque.service';
import { UtilsService } from 'src/app/servicos/utils.service';

@Component({
  selector: 'app-exibir-vendas',
  templateUrl: './exibir-vendas.component.html',
  styleUrls: ['./exibir-vendas.component.css']
})
export class ExibirVendasComponent implements OnInit {

  public isLoading: boolean = false;
  public vendas: venda[] = [];

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
    .subscribe((vendas:venda[])=>{
      this.vendas = vendas;
      this.isLoading = false;
    });
  }

  substr(valor:String = ' sem cupom'): String {
    return String(valor).substring(0,1) === ' ' ? String(valor).substring(1) : String(valor);
  }

}
