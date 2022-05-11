import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/Materia';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) {}
  //Obtener materia por id
  getById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`http://localhost:9898/api/materia/listar-materia/${id}`);
  }
 //Ccrear materia
 crear(materia: Materia): Observable<Materia> {
  return this.http.post<Materia>(`http://localhost:9898/api/materia/`, materia).pipe(
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

//Editar materia
editar(materia: Materia, idMateria: number): Observable<Materia> {
  return this.http.put<Materia>(`http://localhost:9898/api/materia/actualizarMateria/${idMateria}`, materia).pipe(
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
//Eeliminar materia
eliminar(id: number): Observable<Materia> {
  return this.http.delete<Materia>(`http://localhost:9898/api/materia/eliminarMateria/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
  //Lista materias sin paginacion
  getAll(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`http://localhost:9898/api/materia/listarMaterias`);
  }


  //matrias con paginacion
  getDatosPage(
    page: string,
    size: string,
    busqueda: string
  ): Observable<any> {
    return this.http
      .get(
        `http://localhost:9898/api/materia/page?page=${page}&size=${size}&busqueda=${busqueda || ""} `
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

}
