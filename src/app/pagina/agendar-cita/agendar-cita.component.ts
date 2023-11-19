import { Component } from '@angular/core';
import { AgendarCitaDTO } from 'src/app/modelo/agendar-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { Alerta } from 'src/app/modelo/alerta';
import { TokenService } from 'src/app/servicios/token.service';
import { AgendarCitaDTO2 } from 'src/app/modelo/agendar-cita-dto2';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  agendarCitaDTO: AgendarCitaDTO;
  agendarCitaDTO2: AgendarCitaDTO2;
  especialidades: string[];
  medicos: { codigo: number, nombre: string }[];
  alerta!: Alerta;
  codigoPaciente: number;

  constructor(private citaService: CitaService, private clinicaService: ClinicaService, private tokenService: TokenService) {
    this.especialidades = [];
    this.medicos = [];
    this.cargarMedicos();
    this.agendarCitaDTO = new AgendarCitaDTO();
    this.agendarCitaDTO2 = new AgendarCitaDTO2();
    this.cargarEspecialidad();
    this.codigoPaciente = this.tokenService.getCodigo();
  }

  public agendarCita() {
    this.setearDatos();
    this.citaService.agendarCita(this.agendarCitaDTO2).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
  public cargarEspecialidad() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarMedicos() {
    this.clinicaService.listarMedicos().subscribe({
      next: data => {
        this.medicos = data.respuesta.map((medico: { codigo: number, nombre: string }) => ({
          codigo: medico.codigo,
          nombre: medico.nombre
        }));
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public setearDatos() {
    // Formatea la fecha antes de asignarla a agendarCitaDTO
    console.log(this.agendarCitaDTO.fecha);
    console.log(this.agendarCitaDTO.hora);
    console.log(this.agendarCitaDTO2.fecha);
    const formattedFechaHora = this.citaService.formatLocalDateTime(
      this.agendarCitaDTO.fecha,
      this.agendarCitaDTO.hora
    );
    this.agendarCitaDTO2.especialidad = this.agendarCitaDTO.especialidad;
    this.agendarCitaDTO2.motivo = this.agendarCitaDTO.motivo;
    this.agendarCitaDTO2.idMedico = this.agendarCitaDTO.idMedico;
    this.agendarCitaDTO2.fecha = formattedFechaHora;
    this.agendarCitaDTO2.idPaciente = this.codigoPaciente;
  }
}



