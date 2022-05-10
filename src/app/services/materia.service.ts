import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/Materia';
import Swal from 'sweetalert2';
const bd_url = environment.bd_url + "/materia";
@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) {}
  //OBTENER UNA MATERIA POR ID
  getMateriaById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${bd_url}/${id}`);
  }

  //MATERIAS SIN PAGINACION
  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${bd_url}/listarMateria`);
  }


  //PAGINACION DE MATERIA
  getMateriasPage(
    page: string,
    size: string,
    busqueda: string
  ): Observable<any> {
    return this.http
      .get(
        `${bd_url}/page?page=${page}&size=${size}&busqueda=${busqueda || ""} `
      )
      .pipe(
        tap((response: any) => {
          (response.content as Materia[]).forEach((Materia) => {
            return Materia;
          });
        }),
        map((response: any) => {
          (response.content as Materia[]).map((Materia) => {
            return Materia;
          });
          return response;
        })
      );
  }
  //CREAR MATERIA
  crear(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(`${bd_url}/`, materia).pipe(
      map((response: any) => response.materia as Materia),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR MATERIA
  editar(materia: Materia, id: number): Observable<Materia> {
    return this.http.put<Materia>(`${bd_url}/${id}`, materia).pipe(
      map((response: any) => response.materia as Materia),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA MATERIA
  eliminar(id: number): Observable<Materia> {
    return this.http.delete<Materia>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
