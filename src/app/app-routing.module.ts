import { NgModule } from '@angular/core';
import {Routes, RouterModule, } from '@angular/router';
import { DetalleClienteComponent } from './components/cliente/detalle-cliente/detalle-cliente.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { HomeComponent } from './components/home/home.component';
import { CrearVentaComponent } from './components/ventas/crear-venta/crear-venta.component';

const routes: Routes =[
    {path:'home', component: HomeComponent},
    {path:'clientes', component: DetalleClienteComponent},
    {path:'productos', component: DetalleProductoComponent},
    {path:'ventas', component: CrearVentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, DetalleClienteComponent, DetalleProductoComponent, CrearVentaComponent];