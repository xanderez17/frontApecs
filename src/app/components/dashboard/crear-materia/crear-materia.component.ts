import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
})
export class CrearMateriaComponent implements OnInit {
  public materia = new Materia();

  form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private materiaService: MateriaService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({idMateria}) =>
      this.cargarMateria(idMateria)
    );
  }
  cargarMateria(id: number) {
    if (!id) {
      return;
    }
    this.materiaService.getMateriaById(id).subscribe((ma) => {
      if (!ma) {
        return this.irListaMaterias();
      }
      this.materia = ma;
    });
  }
  agregarMaterias() {
    if (this.materia.idMateria) {
      this.materia.nombre = this.form.value.nombre;
      this.materia.contenido = this.form.value.contenido;

      this.materiaService
        .editar(this.materia, this.materia.idMateria)
        .subscribe((ma) => {
          Swal.fire(
            'Actualizar Materia',
            `¡${ma.nombre} actualizada con exito!`,
            'success'
          );
          this.irListaMaterias();
        });
    }
    this.materia.nombre = this.form.value.nombre;
    this.materia.contenido = this.form.value.contenido;
    this.materiaService.crear(this.materia).subscribe((m) => {
      Swal.fire(
        'Nueva materia',
        `¡ Materia ${this.materia.nombre} creada con exito!`,
        'success'
      );
    });
    this.irListaMaterias();
  }

  irListaMaterias() {
    console.log(this.materia.nombre);

    this.router.navigateByUrl('/dashboard/listar-materias');
  }
}
