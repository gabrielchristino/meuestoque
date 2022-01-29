import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { EstoqueService } from 'src/app/servicos/estoque.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public loginForm!: FormGroup;
  public socialUser!: SocialUser;
  public isLoggedin: boolean = false;
  public startSignup: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.estoqueService.socialAuthServiceLogOut();
  }
}
