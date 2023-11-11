import { Injectable } from '@angular/core';
import { ItemCitaDTO } from '../modelo/item-cita-dto';
import { AgendarCitaDTO } from '../modelo/agendar-cita-dto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  cita: ItemCitaDTO[];
  constructor() {
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
}
