import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../../services/producto.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  providers: [ProductoService]
})
export class DetalleProductoComponent implements OnInit {
  productos: Producto[];

  productoById:Producto = new Producto();

  productoCreate: Producto = new Producto();
  
  productoUpdateId: number = null;
  productoUpdate: Producto = new Producto();
  
  productoDeleteId: number = null;
  productoDelete: Producto = new Producto();

  productoCreateForm: FormGroup;
  productoUpdateForm: FormGroup;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
    productoService.GetProductos().subscribe(productos=>{
      this.productos = productos;
    });

    this.productoCreateForm = this.formBuilder.group({
      descripcion: '',
      precio: '',
      stock: ''
    });
    this.productoUpdateForm = this.formBuilder.group({
      descripcion: '',
      precio: '',
      stock: ''
    });

   }

  ngOnInit() {
  }

  GetProductos(){
    this.productoService.GetProductos().subscribe(productos=>{
      this.productos=productos;
    })
  }

  GetProductoById(id:number){
    this.productoService.GetProductoById(id).subscribe(producto=>{
      this.productoById = producto
    })
  }


  CreateProducto(productoData){
    this.productoService.PostProducto(productoData).subscribe(producto=>{
    this.productoCreate = producto;
    this.productoCreateForm = this.formBuilder.group({
      descripcion: '',
      precio: '',
      stock: ''
    });
    this.GetProductos();
  });
  }
  
  setUpdateProducto(producto:Producto){
    this.productoUpdateId = producto.idProducto;
    this.productoUpdateForm = this.formBuilder.group({
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock
    });
  }
  
  UpdateProducto(productoData){
    this.productoService.PutProducto(this.productoUpdateId,productoData).subscribe(producto=>{
      this.productoUpdate = producto;
      this.productoUpdateId = null;
      this.GetProductos();
    });
  }
  
  setDeleteId(id:number){
    this.productoDeleteId = id;
  }
  
  DeleteProducto(){
    this.productoService.DeleteProducto(this.productoDeleteId).subscribe(producto=>{
      this.productoDelete = producto;
      this.productoDeleteId = null;
      this.GetProductos();
    });
  }

}
