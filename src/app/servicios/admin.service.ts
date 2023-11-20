import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroMedicoDTO } from '../modelo/registro-medico-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { DetalleMedicoDTO } from '../modelo/detalle-medico-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminURL = "http://localhost:8080/api/admins";
  constructor(private http: HttpClient) { }
  public registrarMedico(medico: RegistroMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-medico`, medico);
  }

  public listarPQRS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-pqrs`);
  }

  public listarMedicos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-medicos`);
  }

  public obtenerMedico(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/detalle-medico/${codigo}`);
  }
 

  public actualizarMedico(datos: DetalleMedicoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-medico`, datos);
  }
  

  public eliminarMedico(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-medico/${codigo}`);
  }
  
}
