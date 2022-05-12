import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Aula } from "../../../models/Aula";
import { AulasService } from "../../../services/aulas.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrls: ['./listar-aulas.component.css']
})
export class ListarAulasComponent implements OnInit {
  public lista: Aula[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'modaliad', 'ubicacion', 'acciones'];

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 50, 100];

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;

  public cargando: boolean = true;
  public busqueda: string = '';

  constructor(private aulasService: AulasService) {

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
    this.aulasService
      .getDatosPage(page, size, busqueda)
      .subscribe((p) => {
        this.lista = p.content as Aula[];
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
    if (txtBusqueda.length === 0) {
      return this.getDatosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }

  eliminar(aula: Aula) {
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
        text: `¿Seguro que quieres eliminar el aula ${aula.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.aulasService.eliminar(aula.idAula).subscribe((resp) => {
            this.getDatosPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `El  ${aula.nombre} ha  sido eliminada correctamente!`,
              'success'
            );
          });
        }
      });
  }

}

