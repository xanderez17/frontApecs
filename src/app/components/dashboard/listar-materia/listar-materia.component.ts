
import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-materia',
  templateUrl: './listar-materia.component.html',
  styleUrls: ['./listar-materia.component.css']
})
export class ListarMateriaComponent implements OnInit {


  public materias: Materia[] = [];

  displayedColumns: string[] = ['id','nombre', 'contenido','acciones'];


  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;

  public pageSizeOptions: number[] = [5,10, 20, 50, 100];

  dataSource = new MatTableDataSource<Materia>();


  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;

  public cargando: boolean = true;

  public busqueda: string = "";
  lista:Array<any>=[]

  constructor(private materiaServicio: MateriaService) {
    materiaServicio.getMaterias().subscribe((x:any)=>{
      this.lista=x
      console.log(this.lista);

    })
  }

  ngOnInit() {

    this.getMateriasPage(
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
    this.getMateriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getMateriasPage(page: string, size: string, busqueda: string) {
    this.cargando = true;
    this.materiaServicio.getMateriasPage(page, size, busqueda).subscribe((p) => {
      this.materias = p.content as Materia[];
      this.totalRegistros = p.totalElements as number;
      this.paginador._intl.itemsPerPageLabel = "Registros por página:";
      this.paginador._intl.nextPageLabel = "Siguiente";
      this.paginador._intl.previousPageLabel = "Previa";
      this.paginador._intl.firstPageLabel = "Primera Página";
      this.paginador._intl.lastPageLabel = "Última Página";
      this.cargando = false;
    });
  }
  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getMateriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }

  cargarMateriasDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getMateriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }

  eliminarMateria(materia: Materia) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });



    console.log(materia.idMateria)
console.log(materia.nombre)
console.log(materia.contenido)



    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar la materia ${materia.nombre} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.materiaServicio.eliminar(materia.idMateria).subscribe((resp) => {
            this.getMateriasPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `materia ${materia.nombre} eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }
  compararCoordinador(d1: Materia, d2: Materia) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.idMateria === d2.idMateria;
  }
}







