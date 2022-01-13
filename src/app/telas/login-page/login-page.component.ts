import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }
  //client id
  //803165754242-rnmjlr4uogg8cgoht3o7u0irrkhic1mg.apps.googleusercontent.com
  //client secret
  //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
}
