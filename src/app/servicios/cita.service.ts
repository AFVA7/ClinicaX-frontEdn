import { Injectable } from '@angular/core';
import { ItemCitaDTO } from '../modelo/item-cita-dto';
import { AgendarCitaDTO } from '../modelo/agendar-cita-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { AgendarCitaDTO2 } from '../modelo/agendar-cita-dto2';
import { format } from 'date-fns-tz';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private pacienteURL = "http://localhost:8080/api/pacientes";
  cita: ItemCitaDTO[];
  constructor(private http: HttpClient) {
    
    this.cita = [];
    this.cita.push({
      codigo: 1,  nombrePaciente: 'Andrés Valencia', nombreMedico: 'Zaypar', estadoCita: 'PROGRAMADA', fecha:
        '2023-10-12'
    });
    this.cita.push({
      codigo: 1,  nombrePaciente: 'Andrés Valencia', nombreMedico: 'Zaypar', estadoCita: 'PROGRAMADA', fecha:
        '2023-10-12'
    });
    this.cita.push({
      codigo: 1,  nombrePaciente: 'Andrés Valencia', nombreMedico: 'Zaypar', estadoCita: 'CANCELADA', fecha:
        '2023-10-12'
    });
    this.cita.push({
      codigo: 1,  nombrePaciente: 'Andrés Valencia', nombreMedico: 'Zaypar', estadoCita: 'CANCELADA', fecha:
        '2023-10-12'
    });
  }
  public listar(): ItemCitaDTO[] {
    return this.cita;
  }
  public obtener(codigo: number): ItemCitaDTO | undefined {
    return this.cita.find(cita => cita.codigo == codigo);
  }
  public crear(cita: AgendarCitaDTO) {
    let codigo = this.cita.length + 1;
    this.cita.push({
      codigo: codigo, nombrePaciente: ""+cita.idPaciente, nombreMedico: ""+cita.idMedico, estadoCita: 'PROGRAMADA', fecha: new
        Date().toISOString()
    });
  }
  public agendarCita(datos: AgendarCitaDTO2): Observable<MensajeDTO> {
    console.log(datos);
    return this.http.post<MensajeDTO>(`${this.pacienteURL}/agendar-cita`, datos);
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
