import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '@auth0/auth0-angular';
import { EstoqueService } from './servicos/estoque.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UtilsService } from './servicos/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loginForm!: FormGroup;
  // public socialUser!: SocialUser;
  public isLoggedin: boolean = false;
  public startSignup: boolean = false;


  public isLoading: boolean = false;
  constructor(
    // public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public estoqueService: EstoqueService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
  }
  title = 'estoque';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    // this.auth.isAuthenticated$
    //   .subscribe((authenticated: boolean) => {
    //     if (authenticated) {
    //       this.isLoading = true;
    //       this.auth.user$
    //         .subscribe((user: any) => {
    //           this.estoqueService.user = user;
    //           this.estoqueService.sendGetUserRequest(user.email)
    //             .subscribe((usuario: any[]) => {
    //               if (usuario.length !== 0) {
    //                 this.estoqueService.usuario = usuario![0];
    //                 this.estoqueService.sendGetLojaRequest()
    //                   .subscribe((loja: any) => {
    //                     this.estoqueService.loja = loja[0];
    //                     this.isAuthenticated = usuario.length > 0 && usuario[0].active && authenticated;
    //                     this.isLoading = false;
    //                   });
    //               }
    //               if (usuario.length === 0) {
    //                 this.utilsService.showError('Usuário não cadastrado, faça seu cadastro.');
    //                 this.startSignup = true;
    //                 // this.auth.logout({ localOnly: true });
    //                 this.isLoading = false;
    //               }
    //             });
    //         });
    //     }
    //   });


    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.socialAuthService.authState.subscribe((user) => {
    //   this.isLoggedin = (user != null);
    // });

    this.socialAuthService.authState.subscribe((user) => {
      this.estoqueService.user = user;
        if (this.estoqueService.user !== null) {
          this.isLoading = true;
          // this.auth.user$
          //   .subscribe((user: any) => {
              this.estoqueService.sendGetUserRequest(this.estoqueService.user.email)
                .subscribe((usuario: any[]) => {
                  if (usuario.length !== 0) {
                    this.estoqueService.usuario = usuario![0];
                    this.estoqueService.sendGetLojaRequest()
                      .subscribe((loja: any) => {
                        this.estoqueService.loja = loja[0];
                        this.isAuthenticated = usuario.length > 0 && usuario[0].active && (this.estoqueService.user != null);
                        this.router.navigate([`/`], { relativeTo: this.route, skipLocationChange: true });
                        this.isLoading = false;
                      });
                  }else
                  if (usuario.length === 0) {
                    this.utilsService.showError('Usuário não cadastrado, faça seu cadastro.');
                    this.startSignup = true;
                    // this.auth.logout({ localOnly: true });
                    this.isLoading = false;
                  }
                });
            // });
        } else {
          this.isAuthenticated = false;
        }
      });

  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
