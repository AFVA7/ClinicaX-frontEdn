import { Injectable } from '@angular/core';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { RegistroRespuestaDTO } from '../modelo/registro-respuesta-dto';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  private clinicaURL = "http://localhost:8080/api/clinica";
  private pacienteURL = "http://localhost:8080/api/pacientes";
  private pqrsURL = "http://localhost:8080/api/pqrs";
  private mensajeURL = "http://localhost:8080/api/mensajes";
  
  constructor(private http: HttpClient) {
  }

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.pqrsURL}/detalle-pqrs/${codigo}`);
  }
  public crear(pqrs: RegistroPQRSDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.pacienteURL}/crear-pqrs`, pqrs);
  }
  
  public listarTiposPQRS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/lista-tipo-pqrs`);
  }

  public listarMensajes (codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.mensajeURL}/listar/${codigo}`);
  }

  public responder(datos: RegistroRespuestaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.pqrsURL}/responder-pqrs`, datos);
  }
  
}
