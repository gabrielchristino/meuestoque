import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { DialogErrorComponent } from '../dialog/dialog-error/dialog-error.component';
import { EstoqueService } from './estoque.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private estoqueService: EstoqueService
  ) { }


  showError(error: string = '', novaRota: string = '') {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = error

    const dialogRef = this.dialog.open(DialogErrorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data && novaRota !== 'logoff') {
          this.router.navigate([`/${novaRota}`], { relativeTo: this.route, skipLocationChange: true });
        }
        if (data && novaRota === 'logoff') {
          // this.auth.logout();
          this.estoqueService.socialAuthServiceLogOut();
        }
      });
  }
}
