import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { RegistroAtencionDTO } from '../modelo/registro-atencion-dto';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoURL = "http://localhost:8080/api/medicos";
  constructor(private http: HttpClient) { }

  atenderCita(datos: RegistroAtencionDTO): Observable<MensajeDTO> {
    console.log(datos);
    return this.http.post<MensajeDTO>(`${this.medicoURL}/atender-cita`, datos);
  }
  
}
