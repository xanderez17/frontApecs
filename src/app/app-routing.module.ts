import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMateriaComponent } from './components/dashboard/crear-materia/crear-materia.component';
import { ListarMateriaComponent } from './components/dashboard/listar-materia/listar-materia.component';
import {LoginComponent} from "./components/login/login.component";
import {ListarAulasComponent} from "./components/dashboard/listar-aulas/listar-aulas.component";
import {CrearAulasComponent} from "./components/dashboard/crear-aulas/crear-aulas.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', loadChildren:()=> import('./components/dashboard/dashboard.module').then(x => x.DashboardModule) },

  //materias
  {path: 'dashboard/listar-materias', component:ListarMateriaComponent},
  {path: 'dashboard/crear-materias', component:CrearMateriaComponent},
  {path: 'dashboard/editar-materias/:id', component:CrearMateriaComponent},

  //aulas
  {path: 'dashboard/listar-aulas', component:ListarAulasComponent},
  {path: 'dashboard/crear-aulas', component:CrearAulasComponent},
  {path: 'dashboard/editar-aulas/:id', component:CrearAulasComponent},

  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
