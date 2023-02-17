import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) {

  }
  canActivate(): boolean {
    //Si esta autenticado retorna true
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
    //En caso contrario retorna a login y su valor es falso
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
