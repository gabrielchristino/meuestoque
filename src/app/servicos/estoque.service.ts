import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { estoqueItens } from '../compartilhado/models/estoqueItens.model';
import { loja } from '../compartilhado/models/loja.model';
import { usuario } from '../compartilhado/models/usuario.model';
import { venda } from '../compartilhado/models/venda.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { SocialAuthService } from 'angularx-social-login';

export const APP_ID = "estoque-vnaxc";

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {


  private urlBase: string = 'https://estoque-b8fb.restdb.io/rest/';
  private urlBaseMail: string = 'https://estoque-b8fb.restdb.io/mail';

  private _listaCompra = new MatTableDataSource<estoqueItens>();
  private _compraFechada = false;
  private _usuario: any;
  private _user: any;
  private _loja: any;
  private _cookieCamera: any;
  private _habilitarCamera: any;
  private _habilitarTeclado: any;
  private _avisosLidos: any;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': '61ccd120a807fd7408e107e7'
    })
  }


  constructor(
    private fireStorage: AngularFireStorage,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }
  ////consuta estoque
  public sendGetRequest(): Observable<any> {
    return this.httpClient.get(this.urlBase + 'estoque' + `?q={"idLoja":"${this.usuario.idLoja}"}`, this.httpOptions);
  }

  public sendGetRequestByCode(barcode: string): Observable<any> {
    return this.httpClient.get(this.urlBase + 'estoque' + `?q={"barcode":"${barcode}","idLoja":"${this.usuario.idLoja}"}`, this.httpOptions);
  }

  public sendDeleteRequest(idProduto: string): Observable<any> {
    return this.httpClient.delete(this.urlBase + 'estoque' + `/${idProduto}`, this.httpOptions);
  }

  public sendDeleteEstoqueRequest(): Observable<any> {
    return this.httpClient.delete(this.urlBase + 'estoque' + `/*?q={"idLoja":"${this.usuario.idLoja}"}`, this.httpOptions);
  }

  public sendPutRequest(produto: estoqueItens): Observable<any> {
    return this.httpClient.put(this.urlBase + 'estoque' + `/${produto._id}`, JSON.stringify(produto), this.httpOptions);
  }

  public sendPostRequest(produto: estoqueItens): Observable<any> {
    return this.httpClient.post(this.urlBase + 'estoque', JSON.stringify(produto), this.httpOptions);
  }
  ////envia email
  public sendEmail(cupom: string, email: string): Observable<any> {
    const reqEmail = {
      'to': email,
      'subject': 'Segue seu cupom, seja sempre bem vindo',
      'html': cupom,
      'company': 'Minha Loja',
      'sendername': 'Minha Loja vendas'
    }
    return this.httpClient.post(this.urlBaseMail, JSON.stringify(reqEmail), this.httpOptions);
  }
  ////consulta usuario
  public sendGetUserRequest(userMail: string): Observable<any> {
    return this.httpClient.get(this.urlBase + 'controle' + `?q={"email":"${userMail}"}`, this.httpOptions);
  }

  public sendDeleteUserRequest(): Observable<any> {
    return this.httpClient.delete(this.urlBase + 'controle' + `/${this.usuario._id}`, this.httpOptions);
  }

  public sendPutUserRequest(usuario: usuario): Observable<any> {
    return this.httpClient.put(this.urlBase + 'controle' + `/${usuario._id}`, JSON.stringify(usuario), this.httpOptions);
  }

  public sendPostUserRequest(usuario: usuario): Observable<any> {
    return this.httpClient.post(this.urlBase + 'controle', JSON.stringify(usuario), this.httpOptions);
  }
  ////consulta loja
  public sendGetLojaRequest(idLoja: string = ''): Observable<any> {
    return this.httpClient.get(this.urlBase + 'loja' + `?q={"_id":"${this.usuario?.idLoja || idLoja}"}`, this.httpOptions);
  }

  public sendPutLojaRequest(loja: loja): Observable<any> {
    return this.httpClient.put(this.urlBase + 'loja' + `/${loja._id}`, JSON.stringify(loja), this.httpOptions);
  }

  public sendPostLojaRequest(loja: loja): Observable<any> {
    return this.httpClient.post(this.urlBase + 'loja', JSON.stringify(loja), this.httpOptions);
  }

  public sendDeleteLojaRequest(): Observable<any> {
    return this.httpClient.delete(this.urlBase + 'loja' + `/${this.usuario?.idLoja}`, this.httpOptions);
  }
  ////consulta vendas
  public sendGetVendasRequest(): Observable<any> {
    return this.httpClient.get(this.urlBase + 'vendas' + `?q={"loja":"${this.usuario.idLoja}"}`, this.httpOptions);
  }
  public sendPostVendasRequest(venda: venda): Observable<any> {
    return this.httpClient.post(this.urlBase + 'vendas', JSON.stringify(venda), this.httpOptions);
  }

  public salvaCupom(cupom: any, myDate: string): Observable<any> {
    return new Observable((observer) => {
      const fileRef: AngularFireStorageReference = this.fireStorage.ref("lojas").child(this.usuario.idLoja).child(String(myDate));
      const task: AngularFireUploadTask = fileRef.put(cupom);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            observer.next(downloadURL);
            observer.complete();
          });
        })
      ).subscribe();
    });
  }

  public getCupom(myDate: string): Observable<any> {
    return new Observable((observer) => {
      const fileRef: AngularFireStorageReference = this.fireStorage.ref("lojas").child(this.usuario.idLoja).child(String(myDate));

      fileRef.getDownloadURL().subscribe(downloadURL => {
        observer.next(downloadURL);
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  ////consuta avisos
  public sendGetAvisosRequest(): Observable<any> {
    return this.httpClient.get(this.urlBase + 'avisos', this.httpOptions);
  }
  ////navigate
  public navigateTo(rota: string) {
    this.router.navigate([`/${rota}`], { relativeTo: this.route, skipLocationChange: true });
  }
  ////variaveis do sistema
  get listaCompra() {
    return this._listaCompra;
  }

  set listaCompra(lista: MatTableDataSource<estoqueItens>) {
    this._listaCompra = lista;
  }

  get compraFechada() {
    return this._compraFechada;
  }

  set compraFechada(compraFechada: boolean) {
    this._compraFechada = compraFechada;
  }

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario: any) {
    this._usuario = usuario;
  }

  get loja() {
    return this._loja;
  }

  set loja(loja: any) {
    this._loja = loja;
  }

  get user() {
    return this._user;
  }

  set user(user: any) {
    this._user = user;
  }

  get cookieCamera() {
    this._cookieCamera = localStorage.getItem('cookieCamera');
    return this._cookieCamera;
  }

  set cookieCamera(cookieCameraValor: any) {
    localStorage.setItem('cookieCamera', cookieCameraValor);
    this._cookieCamera = this._cookieCamera = localStorage.getItem('cookieCamera');
  }

  get habilitarCamera() {
    this._habilitarCamera = localStorage.getItem('habilitarCamera');
    return this._habilitarCamera;
  }

  set habilitarCamera(habilitarCamera: any) {
    localStorage.setItem('habilitarCamera', habilitarCamera);
    this._habilitarCamera = this._habilitarCamera = localStorage.getItem('habilitarCamera');
  }

  get habilitarTeclado() {
    this._habilitarTeclado = localStorage.getItem('habilitarTeclado');
    return this._habilitarTeclado;
  }

  set habilitarTeclado(habilitarTeclado: any) {
    localStorage.setItem('habilitarTeclado', habilitarTeclado);
    this._habilitarTeclado = this._habilitarTeclado = localStorage.getItem('habilitarTeclado');
  }

  get avisosLidos() {
    this._avisosLidos = localStorage.getItem('avisosLidos');
    return this._avisosLidos;
  }

  set avisosLidos(avisosLidos: any) {
    localStorage.setItem('avisosLidos', avisosLidos);
    this._avisosLidos = this._avisosLidos = localStorage.getItem('avisosLidos');
  }


  //auth
  socialAuthServiceLogOut(): void {
    this.socialAuthService.signOut();
    location.reload();
  }
  socialAuthServiceRevoke(): void {
    this.socialAuthService.signOut(true);
  }
}
