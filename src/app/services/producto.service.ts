import { Injectable } from '@angular/core';
import { DetalleVenta } from './detalle-venta.service';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ProductoService {

  baseurl="http://node47136-env-3246108.jl.serv.net.mx:8080/v1/productos";

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http:HttpClient) { }

  GetProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseurl)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  GetProductoById(id:number): Observable<Producto>{
    return this.http.get<Producto>(this.baseurl+"/"+id)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  PostProducto(data): Observable<Producto>{
    return this.http.post<Producto>(this.baseurl, JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  PutProducto(id, data): Observable<Producto> {
    return this.http.put<Producto>(this.baseurl +"/"+id, JSON.stringify(data), this.httpOptions)
    .pipe(retry(1),catchError(this.errorHandl));
  }
  
  // DELETE
  DeleteProducto(id){
    return this.http.delete<Producto>(this.baseurl + "/" + id, this.httpOptions)
    .pipe(retry(1),catchError(this.errorHandl));
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

export class Producto{
  constructor() {}
  idProducto: number;
  descripcion: string;
  //foto: byte[];
  precio: number;
  stock: number;
  detalleVentas: DetalleVenta[];
}