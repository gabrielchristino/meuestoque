import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/servicos/estoque.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private estoqueService: EstoqueService,
  ) {}

  ngOnInit(): void {
    this.estoqueService.mongoConnect();
  }

}
