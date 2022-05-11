import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import Swal from "sweetalert2";
import {Aula} from "../../../models/Aula";
import {AulasService} from "../../../services/aulas.service";

@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrls: ['./listar-aulas.component.css']
})
export class ListarAulasComponent implements OnInit {
  public lista: Aula[] = [];

  displayedColumns: string[] = ['id', 'nombre','capacidad','modaliad','ubicacion', 'acciones'];

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;

  public pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  dataSource = new MatTableDataSource<Aula>();

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;

  public cargando: boolean = true;
  public busqueda: string = '';
  //lista: Array<any> = [];

  constructor(private aulasService: AulasService) {
    aulasService.getAll().subscribe((x: any) => {
      this.lista = x;
    });
  }

  ngOnInit() {
    this.getPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getPage(page: string, size: string, busqueda: string) {
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
      this.getPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }

  cargarDatosDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getPage(
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
            this.getPage(
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

