import { Injectable } from '@angular/core';
import { ItemCitaDTO } from '../modelo/item-cita-dto';
import { AgendarCitaDTO } from '../modelo/agendar-cita-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { AgendarCitaDTO2 } from '../modelo/agendar-cita-dto2';
import { format } from 'date-fns-tz';
import { CancelamientoCitaDTO } from '../modelo/cancelamienti-cita-dto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private pacienteURL = "http://localhost:8080/api/pacientes";
  private citaURL = "http://localhost:8080/api/citas";
  
  constructor(private http: HttpClient) {
  }
  public listar(codigo: number):  Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.citaURL}/listar-todas/${codigo}`);
  }
  
  public obtenerCita(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.citaURL}/detalle-cita/${codigo}`);
  }

  public obtenerCitasPendientes(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.citaURL}/citas-pendientes-paciente/${codigo}`);
  }
  
  public agendarCita(datos: AgendarCitaDTO2): Observable<MensajeDTO> {
    console.log(datos);
    return this.http.post<MensajeDTO>(`${this.pacienteURL}/agendar-cita`, datos);
  }

  public cancelarCita (datos: CancelamientoCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.citaURL}/cancelar`, datos);
  }

  formatLocalDateTime(fecha: string, hora: string): string {
    // Combina la fecha y la hora para crear un string en formato 'yyyy-MM-ddTHH:mm'
    const fechaHoraString = `${fecha}T${hora}`;
    // Crea un objeto de fecha con el string de fecha y hora
    const fechaHora = new Date(fechaHoraString);
    // Formatea la fecha en un string 'yyyy-MM-ddTHH:mm'
    const formattedFechaHora = format(fechaHora, "yyyy-MM-dd'T'HH:mm", { timeZone: 'America/Bogota' });
    return formattedFechaHora;
  }
}
