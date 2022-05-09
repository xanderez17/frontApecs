import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {timeout} from "rxjs/operators";
import {Router} from "@angular/router";

import {MateriaService} from "../../servicios/materia.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading= false;
  listausuario:Array<Usuario>=[]
  cont: number=0;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router:Router,
              private serviceUser:UsuarioService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    this.serviceUser.getUsuarios().subscribe((x:any)=>{
      this.listausuario=x;

      for (let us of this.listausuario){
        if (us.username==usuario&&us.password==password){
          this.cont=1;
        }
      }
      if (this.cont==1){
        this.router.navigateByUrl('/dashboard')
      }else{
        this._snackBar.open('Usuario o Contraseña Incorrectos!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }


  fakeLoading(){
    this.loading=true;
    setTimeout(()=>{
      //Redireccionar al Dashboard
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
