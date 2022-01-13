import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EstoqueService } from './servicos/estoque.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoading: boolean = false;
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public estoqueService: EstoqueService,
    private _snackBar: MatSnackBar,
    ) {
    }
  title = 'estoque';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$
    .subscribe((authenticated:boolean)=>{
      if(authenticated) {
        this.isLoading = true;
        this.auth.user$
        .subscribe((user:any)=>{
          this.estoqueService.sendGetUserRequest(user.email)
          .subscribe((usuario:any[])=>{
            this.isAuthenticated = usuario.length > 0 && usuario[0].active && authenticated;
            if(usuario.length === 0) this._snackBar.open('Usuário não cadastrado, contacte o administrador.', 'Ok');
            if(usuario.length === 0) this.auth.logout({localOnly:true});;
            this.isLoading = false;
          });
        });
      }
    });

  }
}
