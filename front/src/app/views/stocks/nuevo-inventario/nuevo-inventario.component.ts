import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../Services/inventario.service';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../../Services/proveedor.service';
import { IProveedor } from '../../../Interfaces/iproveedor';

@Component({
  selector: 'app-nuevo-inventario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-inventario.component.html',
  styleUrl: './nuevo-inventario.component.css',
})
export class NuevoInventarioComponent {
  title = 'Nuevo Inventario';
  id!: number;


  ListaProveedores: IProveedor[];
  stock: FormGroup = new FormGroup({
    ID_proveedor: new FormControl('', Validators.required),
    Nombre_producto: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Precio_unitario: new FormControl('', Validators.required),
  });
  constructor(
    private inventarioServicio: InventarioService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private proveedorServicio: ProveedorService
  ) {}
  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargaProveedor();
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Stock';
    } else {
      this.title = 'Actualizar Stock';
      this.inventarioServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.stock.patchValue({
          ID_proveedor: res.ID_proveedor,
          Nombre_producto: res.Nombre_producto,
          Cantidad: res.Cantidad,
          Precio_unitario: res.Precio_unitario,
        });
      });
    }
  }
  
  cargaProveedor() {
    this.proveedorServicio.todos().subscribe((res) => {
      this.ListaProveedores = res;

    });
  

    return this.stock.controls;
  }
  grabar() {
    Swal.fire({
      title: 'Productos',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.inventarioServicio.insertar(this.stock.value).subscribe((res) => {
            Swal.fire({
              title: 'Productos',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/dashboard/inventarios']);
            this.id = 0;
          });
        } else {
          this.inventarioServicio
            .actualizar(this.stock.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Productos',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/dashboard/inventarios']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Productos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
