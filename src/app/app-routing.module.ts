import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMateriaComponent } from './components/dashboard/crear-materia/crear-materia.component';
import { ListarMateriaComponent } from './components/dashboard/listar-materia/listar-materia.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', loadChildren:()=> import('./components/dashboard/dashboard.module').then(x => x.DashboardModule) },
  {path: 'dashboard/listar-materias', component:ListarMateriaComponent},
  {path: 'dashboard/crear-materias', component:CrearMateriaComponent},
  {path: 'dashboard/crear-materias/:id', component:CrearMateriaComponent},

  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
