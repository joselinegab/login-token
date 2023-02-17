import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService) {
    this.usuario = new UsuarioModel();
  }


  ngOnInit(): void {
    this.usuario.email = 'jcastro12@utmachala.edu.ec';
    //Si en el localStorage tiene el item "email", coloca el email en "email" de usuario y
    //la variable va a cambiar su estado a true
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //Mensaje Swal alert para que al ingresar salga un mensaje y algunas de sus propiedades (text, icon)
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor..',
      icon: 'info'

    });

    this.auth.login(this.usuario).subscribe({
      next: (resp) => {
        console.log(resp);
        //Antes de que se completa un login, pregunta si el recordarme es true
        //Si es true significa que el user ha marcado el check entonces
        //Almacenará y guardará el valor del "email" en el localStorage
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        Swal.close();
      },
      error(err) {
        console.log(err.error.error.message);
        Swal.fire({
          //No permitir dar clic fuera del botón o alerta
          allowOutsideClick: false,
          title: 'Error al autenticar..',
          text: err.error.error.message,
          icon: 'error'
        });
      }

    });
  }
}
