import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroMedicoDTO } from '../modelo/registro-medico-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private medicoURL = "http://localhost:8080/api/admins";
  constructor(private http: HttpClient) { }
  public registrarMedico(medico: RegistroMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.medicoURL}/crear-medico`, medico);
  }
}
