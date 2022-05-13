import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-materia',
  templateUrl: './listar-materia.component.html',
  styleUrls: ['./listar-materia.component.css'],
})
export class ListarMateriaComponent implements OnInit {

  public lista!: MatTableDataSource<any>;
//datos encabezado tablas
  displayedColumns: string[] = ['id', 'nombre', 'contenido', 'acciones'];

  //varibel paginador
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 25, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private materiaServicio: MateriaService
    ) {
  }

  ngOnInit() {

    this.materiaServicio.getAll().subscribe((response) => {
      this.lista = new MatTableDataSource(response);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;

    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }
// filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;

  }

//emininar
  eliminar(materia: Materia) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminar la materia ${materia.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.materiaServicio.eliminar(materia.idMateria).subscribe((resp) => {

            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `La materia ${materia.nombre} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
      });
  }

}
