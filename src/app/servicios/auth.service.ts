import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroPacienteDTO } from '../modelo/registro-paciente-dto';
import { Observable, catchError, throwError } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { LoginDTO } from '../modelo/login-dto';
import { TokenDTO } from '../modelo/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";
  constructor(private http: HttpClient) { }

  public registrarPaciente(paciente: RegistroPacienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrarse`, paciente);
  }

  public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
    const response = this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
    return response.pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO>{
    const response = this.http.post<MensajeDTO>(`${this.authURL}/refresh`, tokenDTO);
    return response.pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  recuperarContrasena(email: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/recuperar-passwd/${email}`);
  }
}


