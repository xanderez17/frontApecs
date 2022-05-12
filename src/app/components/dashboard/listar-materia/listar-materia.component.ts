import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-materia',
  templateUrl: './listar-materia.component.html',
  styleUrls: ['./listar-materia.component.css'],
})
export class ListarMateriaComponent implements OnInit {
  public lista: Materia[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'contenido', 'acciones'];

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 50, 100];

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;

  public cargando: boolean = true;
  public busqueda: string = '';

  constructor(private materiaServicio: MateriaService) {

  }

  ngOnInit() {
    this.getDatosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }


  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getDatosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  getDatosPage(page: string, size: string, busqueda: string) {
    this.cargando = true;
    this.materiaServicio
      .getDatosPage(page, size, busqueda)
      .subscribe((p) => {
        this.lista = p.content as Materia[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
        this.paginador._intl.nextPageLabel = 'Siguiente';
        this.paginador._intl.previousPageLabel = 'Previa';
        this.paginador._intl.firstPageLabel = 'Primera Página';
        this.paginador._intl.lastPageLabel = 'Última Página';
        this.cargando = false;
      });
  }

  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getDatosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }

  cargarDatosDefault(txtBusqueda: string) {
    if (txtBusqueda.length == 0) {
      return this.getDatosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }

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
            this.getDatosPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
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
