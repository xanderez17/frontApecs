import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
})
export class CrearMateriaComponent implements OnInit {
  public materia= new Materia();


  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private materiaService:MateriaService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
    });
  }

  ngOnInit(): void {}


  agregarMatrias() {

  }
  irListaMaterias() {
    this.router.navigateByUrl("/dashboard/lista-materias");
  }
}
