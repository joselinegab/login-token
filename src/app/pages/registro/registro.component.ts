import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;

  constructor(private auth: AuthService,
    private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit(): void {
    this.usuario.email = 'jcastro123@utmachala.edu.ec';

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.nuevoUsuario(this.usuario).subscribe({
      next(resp) {
        console.log(resp);
        this.usuario = "";
      },
      error(err) {
        console.log(err.error.error.message);
      },
      //Cuando se complete el registro va a la página de home
      complete: () => this.router.navigateByUrl('/home'),
    });
  }
}
