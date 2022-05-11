import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Aula} from "../../../models/Aula";
import {AulasService} from "../../../services/aulas.service";

@Component({
  selector: 'app-crear-aulas',
  templateUrl: './crear-aulas.component.html',
  styleUrls: ['./crear-aulas.component.css']
})
export class CrearAulasComponent implements OnInit {
  lista: Aula = new Aula();
  idEdit!: string | null;

  form: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private aulasService: AulasService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', Validators.required],
      modalidad: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarAula(Number(this.idEdit));
  }
  cargarAula(id: number) {
    if (!id) {
      return;
    }
    this.aulasService.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }
  agregar() {
    if (this.idEdit) {
      this.aulasService
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Aula editada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.aulasService.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Aula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

      this.irLista();
    }
  }

  irLista() {
    this.router.navigateByUrl('/dashboard/listar-aulas');
  }
}
