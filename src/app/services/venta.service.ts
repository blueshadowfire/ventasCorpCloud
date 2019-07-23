import { Injectable } from '@angular/core';
import { Cliente } from './cliente.service';
import { DetalleVenta } from './detalle-venta.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }
}

export class Venta{
  constructor(){}
  idVenta: number;
  estadoVenta: string;
  fechaVenta: Date; 
  detalleVentas: DetalleVenta[];
  cliente: Cliente;
}