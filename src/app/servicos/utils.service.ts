import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DialogErrorComponent } from '../dialog/dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
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
          this.router.navigate([`/${novaRota}`], { relativeTo: this.route });
        }
        if (data && novaRota === 'logoff') {
          this.auth.logout();
        }
      });
  }
}
