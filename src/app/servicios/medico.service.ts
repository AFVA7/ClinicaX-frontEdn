import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { RegistroAtencionDTO } from '../modelo/registro-atencion-dto';
import { DiaLibreDTO } from '../modelo/dia-libre-dto';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoURL = "http://localhost:8080/api/medicos";
  constructor(private http: HttpClient) { }

  atenderCita(datos: RegistroAtencionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.medicoURL}/atender-cita`, datos);
  }
  registrarDiaLibre(datos: DiaLibreDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.medicoURL}/agendar-dia-libre`, datos);
  }

  public historialDeAtencionesDeUnMedico(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.medicoURL}/listar-atenciones/${codigo}`);
  }
  
  
}
