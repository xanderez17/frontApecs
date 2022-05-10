import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
})
export class CrearMateriaComponent implements OnInit {
  materia: Materia = new Materia();
  idEdit!: string | null;

  form: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarMateria(Number(this.idEdit));
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
    if (this.idEdit) {
      this.materiaService
        .editar(this.materia, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Materia editada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irListaMaterias();
        });
    } else {
      this.materiaService.crear(this.materia).subscribe((m) => {
        this._snackBar.open('Materia creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irListaMaterias();
      });

      this.irListaMaterias();
    }
  }

  irListaMaterias() {
    this.router.navigateByUrl('/dashboard/listar-materias');
  }
}
