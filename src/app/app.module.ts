import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './compartilhado/title/title.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EstoqueListaComponent } from './telas/estoque-lista/estoque-lista.component';
import { ItemEditarComponent } from './telas/item-editar/item-editar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog/dialog-confirm/dialog-confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogAlertComponent } from './dialog/dialog-alert/dialog-alert.component';
import { DialogConsultaComponent } from './dialog/dialog-consulta/dialog-consulta.component';
import { novaVendaComponent } from './telas/nova-venda/nova-venda.component';
import { DialogErrorComponent } from './dialog/dialog-error/dialog-error.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { DialogValorComponent } from './dialog/dialog-valor/dialog-valor.component';
import { CupomComponent } from './telas/cupom/cupom.component';
import { NgxPrintModule } from 'ngx-print';
import { HomePageComponent } from './telas/home-page/home-page.component';
import { LoginPageComponent } from './telas/login-page/login-page.component';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

import { ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CadastroUsuarioLojaComponent } from './telas/cadastro-usuario-loja/cadastro-usuario-loja.component';
import { DialogQrcodeComponent } from './dialog/dialog-qrcode/dialog-qrcode.component';
import { QrCodeModule } from 'ng-qrcode';
import { ConfiguracaoComponent } from './telas/configuracao/configuracao.component';

import { CookieService } from 'ngx-cookie-service';
import { DialogPhotoComponent } from './dialog/dialog-photo/dialog-photo.component';
registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    EstoqueListaComponent,
    ItemEditarComponent,
    DialogConfirmComponent,
    DialogAlertComponent,
    DialogConsultaComponent,
    novaVendaComponent,
    DialogErrorComponent,
    DialogValorComponent,
    CupomComponent,
    HomePageComponent,
    LoginPageComponent,
    CadastroUsuarioLojaComponent,
    DialogQrcodeComponent,
    ConfiguracaoComponent,
    DialogPhotoComponent
  ],
  imports: [

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
    MatBadgeModule,

    NgxPrintModule,
    BarcodeScannerLivestreamModule,
    QrCodeModule,

    ReactiveFormsModule,
    SocialLoginModule,

    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '803165754242-rnmjlr4uogg8cgoht3o7u0irrkhic1mg.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
