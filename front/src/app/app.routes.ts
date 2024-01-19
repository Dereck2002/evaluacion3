import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProveedoresComponent } from './Views/proveedores/proveedores.component';
import { InventariosComponent } from './views/stocks/inventarios.component';
import { NuevoProveedorComponent } from './Views/proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { NuevoInventarioComponent } from './views/stocks/nuevo-inventario/nuevo-inventario.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
   
  {
    path: 'proveedores',
    component: ProveedoresComponent,
  },
  {
    path: 'nuevo-proveedor',
    component: NuevoProveedorComponent,
  },
  {
    path: 'editar-proveedor/:id',
    component: NuevoProveedorComponent,
  },
  {
    path: 'inventarios',
    component: InventariosComponent,
  },
  {
    path: 'nuevo-inventario',
    component: NuevoInventarioComponent,
  },
  {
    path: 'editar-inventario/:id',
    component: NuevoInventarioComponent,
  },
 

    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
