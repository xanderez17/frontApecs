import { Injectable } from '@angular/core';
import {Usuario} from "../interfaces/usuario";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url='http://localhost:9898/api/usuarios/listarUsuarios';

  /*listUsuarios: Usuario[] = [
    {usuario: "xander", nombre: "Kevin", apellido: "Hernández", sexo: 'Masculino'},
    {usuario: "angelsoluk", nombre: "Angel", apellido: "Villa", sexo: 'Masculino'},
    {usuario: "json", nombre: "Jefferson", apellido: "Condo", sexo: 'Masculino'},
    {usuario: "isaias", nombre: "Isaias", apellido: "Rodriguez", sexo: 'Masculino'}
  ];*/

  constructor(private httpClient:HttpClient) {
  }

  getUsuarios():Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url);
  }


}
