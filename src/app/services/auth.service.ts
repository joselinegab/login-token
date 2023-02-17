import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1";

  private apiKey = 'AIzaSyAhd3V5_OsuBzYhlM2LJ8Lq6l2J5owvsqQ'

  userToken : string;

  //Crear y registrar usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Iniciar sesion
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      //email:usuario.email,
      //password:usuario.password,
      //nombre:usuario.nombre

      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData
      //Código inbebido dentro del HTTP (tubería) enviando algo dentro del mismo http.post
    ).pipe(
      //GUARDAR LOS TOKENS
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      //email:usuario.email,
      //password:usuario.password,
      //nombre:usuario.nombre

      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`, authData
    ).pipe(
      //GUARDAR LOS TOKENS
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  //Localstorage: se almacena en la consola del cliente
  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  private leerToken() {
    //Pregunta si existe un método token
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.leerToken.length>2;
  }
}
