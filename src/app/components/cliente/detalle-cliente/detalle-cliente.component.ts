import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../../services/cliente.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css'],
  providers: [ClienteService]
})
export class DetalleClienteComponent implements OnInit {

  clientes: Cliente[];
  clienteById: Cliente = new Cliente();
  clientesByEstado:Cliente[];
  clientesByNombre:Cliente[];

  clienteCreate: Cliente = new Cliente();
  
  clienteUpdateId: number = null;
  clienteUpdate: Cliente = new Cliente();
  
  clienteDeleteId: number = null;
  clienteDelete: Cliente = new Cliente();

  clienteCreateForm: FormGroup;
  clienteUpdateForm: FormGroup;

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder ) { 
    
    this.clienteService.GetClientesByEstado("activo").subscribe(clientes=>{
      this.clientesByEstado=clientes
    });
    this.clienteUpdateForm = this.formBuilder.group({
      apellidoMaterno: '',
      apellidoPaterno: '',
      dni: '',
      nombres: '',
      estadoCliente:'activo'
    });
    this.clienteCreateForm = this.formBuilder.group({
      apellidoMaterno: '',
      apellidoPaterno: '',
      dni: '',
      estadoCliente: 'activo',
      nombres: ''
    });
  }

  ngOnInit() {
  }

  GetClientes(){
    this.clienteService.GetClientes().subscribe(clientes=>{
      this.clientes=clientes;
    })
  }

  GetClienteById(id:number){
    this.clienteService.GetClienteById(id).subscribe(cliente=>{
      this.clienteById = cliente
    })
  }

  GetClientesByEstado(estado:string){
    this.clienteService.GetClientesByEstado(estado).subscribe(clientes=>{
      this.clientesByEstado=clientes
    })
  }

  GetClientesByNombre(nombre:string){
    this.clienteService.GetClientesByNombre(nombre).subscribe(clientes=>{
      this.clientesByNombre=clientes
    })
  }

  CreateCliente(clienteData){
      this.clienteService.PostCliente(clienteData).subscribe(cliente=>{
      this.clienteCreate = cliente;
      this.clienteCreateForm = this.formBuilder.group({
        apellidoMaterno: '',
        apellidoPaterno: '',
        dni: '',
        estadoCliente: 'activo',
        nombres: ''
      });
      this.GetClientesByEstado("activo");
    });
  }

  setUpdateCliente(cliente:Cliente){
    this.clienteUpdateId = cliente.idCliente;
    this.clienteUpdateForm = this.formBuilder.group({
      apellidoMaterno: cliente.apellidoMaterno,
      apellidoPaterno: cliente.apellidoPaterno,
      dni: cliente.dni,
      nombres: cliente.nombres,
      estadoCliente:'activo'
    });
  }

  UpdateCliente(clienteData){
    this.clienteService.PutCliente(this.clienteUpdateId,clienteData).subscribe(cliente=>{
      this.clienteUpdate = cliente;
      this.clienteUpdateId = null;
      this.GetClientesByEstado("activo");
    });
  }

  setDeleteId(id:number){
    this.clienteDeleteId = id;
  }

  DeleteCliente(){
    this.clienteService.GetClienteById(this.clienteDeleteId).subscribe(cliente=>{
      this.clienteDelete = cliente;
      this.clienteDelete.estadoCliente = "inactivo";
      this.clienteService.PutCliente(this.clienteDelete.idCliente,this.clienteDelete).subscribe(cliente=>{
        this.clienteDelete = cliente;
        this.clienteDeleteId = null;
        this.GetClientesByEstado("activo");
      });
    })
    /*this.clienteService.DeleteCliente(this.clienteDeleteId).subscribe(cliente=>{
      this.clienteDelete = cliente;
    });*/
  }

}
