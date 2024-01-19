import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IStock } from '../../Interfaces/iinventario';
import { InventarioService} from '../../Services/inventario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css',
})
export class InventariosComponent {
  title = 'Inventarios';
  stocks: IStock[];

  constructor(private inventariosServicio: InventarioService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.inventariosServicio.todos().subscribe((listainventario) => {
      this.stocks = listainventario;
      console.log(listainventario);
    });
  }
  alerta() {
    Swal.fire('Inventarios', 'Mensaje en Stocks', 'success');
  }

  eliminar(ID_producto: number) {
    Swal.fire({
      title: 'Inventarios',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventariosServicio.eliminar(ID_producto).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Inventarios',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Inventarios',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
