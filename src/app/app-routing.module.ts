import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CupomComponent } from './telas/cupom/cupom.component';
import { EstoqueListaComponent } from './telas/estoque-lista/estoque-lista.component';
import { HomePageComponent } from './telas/home-page/home-page.component';
import { ItemEditarComponent } from './telas/item-editar/item-editar.component';
import { novaVendaComponent } from './telas/nova-venda/nova-venda.component';
import { CadastroUsuarioLojaComponent } from './telas/cadastro-usuario-loja/cadastro-usuario-loja.component';
import { ConfiguracaoComponent } from './telas/configuracao/configuracao.component';
import { ExibirVendasComponent } from './telas/exibir-vendas/exibir-vendas.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'listaEstoque', component: EstoqueListaComponent },
  { path: 'novaVenda', component: novaVendaComponent },
  { path: 'novoItem', component: ItemEditarComponent },
  { path: 'cupomPage', component: CupomComponent },
  { path: 'editaItem/:barcode', component: ItemEditarComponent },
  { path: 'cadastro', component: CadastroUsuarioLojaComponent },
  { path: 'configuracao', component: ConfiguracaoComponent },
  { path: 'vendas', component: ExibirVendasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
