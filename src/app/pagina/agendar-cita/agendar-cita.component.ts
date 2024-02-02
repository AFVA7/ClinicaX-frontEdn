import { Component } from '@angular/core';
import { AgendarCitaDTO } from 'src/app/modelo/agendar-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { Alerta } from 'src/app/modelo/alerta';
import { TokenService } from 'src/app/servicios/token.service';
import { AgendarCitaDTO2 } from 'src/app/modelo/agendar-cita-dto2';
import { HorarioDTO } from 'src/app/modelo/horario-dto';
import { ItemMedicoDTO } from 'src/app/modelo/item-medico-dto';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  agendarCitaDTO: AgendarCitaDTO;
  agendarCitaDTO2: AgendarCitaDTO2;
  medico!: ItemMedicoDTO;
  especialidades: string[];
  medicos: ItemMedicoDTO[];
  horariosDisponibles: HorarioDTO[][] = [];
  alerta!: Alerta;
  codigoPaciente: number;
  horariosMedicoSeleccionado: HorarioDTO[] = [];

  constructor(private citaService: CitaService, private clinicaService: ClinicaService, private tokenService: TokenService) {
    this.especialidades = [];
    this.medicos = [];
    this.agendarCitaDTO = new AgendarCitaDTO();
    this.agendarCitaDTO2 = new AgendarCitaDTO2();
    this.cargarEspecialidad();
    this.codigoPaciente = this.tokenService.getCodigo();
  }

  public obtenerMedicosPorEspecialidad(especialidad: string) {
    if (especialidad) {
      this.clinicaService.obtenerMedicosPorEspecialidad(especialidad).subscribe({
        next: data => {
          this.medicos = data.respuesta;
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          this.medicos = [];
          this.horariosMedicoSeleccionado = [];
        }
      });
    }
  }

  public obtenerHorariosMedico(codigo: number){
    const medicoSeleccionado = this.medicos.find(medico => medico.codigo === codigo);
    if (medicoSeleccionado) {
      this.medico = medicoSeleccionado;
      this.horariosMedicoSeleccionado = this.medico.horarios;
  } else {
      console.error('No se encontró ningún médico con el código especificado');
      this.horariosMedicoSeleccionado = [];
  }
  }


  public agendarCita() {
    alert("agendando, espere...")
    this.setearDatos();
    const fechaActual = new Date()

    this.citaService.agendarCita(this.agendarCitaDTO2).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
  getFechaActual(): string {
    const today = new Date();
    // Formatea la fecha como "YYYY-MM-DD"
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }
  

  public cargarEspecialidad() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
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
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }


  public setearDatos() {
    // Formatea la fecha antes de asignarla a agendarCitaDTO
    console.log(this.agendarCitaDTO.fecha);
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



