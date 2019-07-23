import { Injectable } from '@angular/core';
import { Venta } from './venta.service';
import { Producto } from './producto.service';

@Injectable()
export class DetalleVentaService {

  constructor() { }
}


export class DetalleVenta{
  constructor() {}
  cantidad: number; 
  precioVenta: number;
  venta: Venta;
  producto: Producto;
}