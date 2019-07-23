import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Venta } from './venta.service';

@Injectable()
export class ClienteService {

  baseurl="http://node47136-env-3246108.jl.serv.net.mx:8080/v1/clientes";
  
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }
  
  constructor(private http:HttpClient) { }
  
  GetClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseurl)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  GetClienteById(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(this.baseurl+"/"+id)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  GetClientesByEstado(estado:string): Observable<Cliente[]>{
    let consulta = "/consulta?estado="+estado;
    return this.http.get<Cliente[]>(this.baseurl+consulta)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  GetClientesByNombre(nombre:string): Observable<Cliente[]>{
    let consulta = "/filtrarPorNombre?criterio="+nombre;
    return this.http.get<Cliente[]>(this.baseurl+consulta)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  PostCliente(data): Observable<Cliente>{
    return this.http.post<Cliente>(this.baseurl, JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  PutCliente(id, data): Observable<Cliente> {
    return this.http.put<Cliente>(this.baseurl +"/"+id, JSON.stringify(data), this.httpOptions)
    .pipe(retry(1),catchError(this.errorHandl));
  }
  
  // DELETE
  DeleteCliente(id){
    return this.http.delete<Cliente>(this.baseurl +"/"+ id, this.httpOptions)
    .pipe(retry(1),catchError(this.errorHandl));
  }

  GetVentasOfCliente(id){
    return this.http.get<Venta[]>(this.baseurl+"/"+id+"/ventas")
    .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);   
  } 

}

export class Cliente{
  constructor(){}
  idCliente: number;
	apellidoMaterno: string;
	apellidoPaterno: string;
  dni: string;
	estadoCliente: string;
	nombres: string;
}