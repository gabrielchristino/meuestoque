import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConsultaComponent } from '../../dialog/dialog-consulta/dialog-consulta.component';
import { SocialAuthService } from 'angularx-social-login';
import { EstoqueService } from 'src/app/servicos/estoque.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private socialAuthService: SocialAuthService,
    public estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
  }


  exibirAlerta(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'consulta';

    const dialogRef = this.dialog.open(DialogConsultaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {

      });
  }

  lougout() {
    // this.auth.logout({ returnTo: document.location.origin });
    this.socialAuthService.signOut();
  }
}
