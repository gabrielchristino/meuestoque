import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EstoqueService } from './servicos/estoque.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loginForm!: FormGroup;
  public socialUser!: SocialUser;
  public isLoggedin: boolean = false;


  public isLoading: boolean = false;
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public estoqueService: EstoqueService,
    private _snackBar: MatSnackBar,

    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
  }
  title = 'estoque';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.isLoading = true;
          this.auth.user$
            .subscribe((user: any) => {
              this.estoqueService.sendGetUserRequest(user.email)
                .subscribe((usuario: any[]) => {
                  if (usuario.length !== 0) {
                    this.estoqueService.usuario = usuario![0];
                    this.estoqueService.sendGetLojaRequest()
                      .subscribe((loja: any) => {
                        this.estoqueService.loja = loja[0];
                        this.isAuthenticated = usuario.length > 0 && usuario[0].active && authenticated;
                        this.isLoading = false;
                      });
                  }
                  if (usuario.length === 0) {
                    this._snackBar.open('Usuário não cadastrado, contacte o administrador.', 'Ok');
                    this.auth.logout({ localOnly: true });
                    this.isLoading = false;
                  }
                });
            });
        }
      });

  }

  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });

  //   this.socialAuthService.authState.subscribe((user) => {
  //     this.socialUser = user;
  //     this.isLoggedin = (user != null);
  //     console.log(this.socialUser);
  //   });
  // }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }
}
