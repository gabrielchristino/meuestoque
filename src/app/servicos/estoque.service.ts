import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { estoqueItens } from '../compartilhado/models/estoqueItens.model';

export const APP_ID = "estoque-vnaxc";

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {


  private urlBase: string = 'https://estoque-b8fb.restdb.io/rest/';
  private urlBaseMail: string = 'https://estoque-b8fb.restdb.io/mail';

  private _listaCompra = new MatTableDataSource<estoqueItens>();
  private _compraFechada = false;
  private _mensagem: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': '61ccd120a807fd7408e107e7'
    })
  }


  constructor(
    private httpClient: HttpClient
    ) { }

  public sendGetRequest(): Observable<any> {
    return this.httpClient.get(this.urlBase + 'estoque', this.httpOptions);
  }

  public sendGetRequestByCode(barcode: string): Observable<any> {
    return this.httpClient.get(this.urlBase + 'estoque' + `?q={"barcode": "${barcode}"}`, this.httpOptions);
  }

  public sendDeleteRequest(idProduto: string): Observable<any> {
    return this.httpClient.delete(this.urlBase + 'estoque' + `/${idProduto}`, this.httpOptions);
  }

  public sendPutRequest(produto: estoqueItens): Observable<any> {
    return this.httpClient.put(this.urlBase + 'estoque' + `/${produto._id}`, JSON.stringify(produto), this.httpOptions);
  }

  public sendPostRequest(produto: estoqueItens): Observable<any> {
    return this.httpClient.post(this.urlBase + 'estoque', JSON.stringify(produto), this.httpOptions);
  }

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

  get mensagem() {
    return this._mensagem;
  }

  set mensagem(mensagem: string) {
    this._mensagem = mensagem;
  }

  public sendGetUserRequest(userMail: string): Observable<any> {
    return this.httpClient.get(this.urlBase + 'controle' + `?q={"email":"${userMail}"}`, this.httpOptions);
  }
}
