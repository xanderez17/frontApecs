import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {Aula} from "../models/Aula";

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor(private http: HttpClient) {}
  //Obtener aula por id
  getById(idAula: number): Observable<Aula> {
    return this.http.get<Aula>(`http://localhost:9898/api/aula/listar-aula/${idAula}`);
  }
  //Lista aula sin paginacion
  getAll(): Observable<Aula[]> {
    return this.http.get<Aula[]>(`http://localhost:9898/api/aula/listarAulas`);
  }
  //Crear Aula
  crear(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(`http://localhost:9898/api/aula/`, aula).pipe(
      map((response: any) => response.aula as Aula),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

//Editar aula
  editar(aula: Aula, idAula: number): Observable<Aula> {
    return this.http.put<Aula>(`http://localhost:9898/api/aula/actualizarAula/${idAula}`, aula).pipe(
      map((response: any) => response.aula as Aula),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
//Eeliminar aula
  eliminar(id: number): Observable<Aula> {
    return this.http.delete<Aula>(`http://localhost:9898/api/aula/elminarAula/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }



  //aulas con paginacion
  getDatosPage(
    page: string,
    size: string,
    busqueda: string
  ): Observable<any> {
    return this.http
      .get(
        `http://localhost:9898/api/aula/page?page=${page}&size=${size}&busqueda=${busqueda || ""} `
      )
      .pipe(
        tap((response: any) => {
          (response.content as Aula[]).forEach((Aula) => {
            return Aula;
          });
        }),
        map((response: any) => {
          (response.content as Aula[]).map((Aula) => {
            return Aula;
          });
          return response;
        })
      );
  }

}
