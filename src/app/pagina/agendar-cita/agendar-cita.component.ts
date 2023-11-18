import { Component } from '@angular/core';
import { AgendarCitaDTO } from 'src/app/modelo/agendar-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  agendarCitaDTO: AgendarCitaDTO;
  especialidades: string[];
  medicos: string[];

  constructor(private citaService: CitaService, private clinicaService: ClinicaService) {
    this.especialidades = [];
    this.medicos = [];
    this.cargarMedicos();
    this.agendarCitaDTO = new AgendarCitaDTO();
    this.cargarEspecialidad();
    }
    public agendarCita(){
    this.citaService.crear(this.agendarCitaDTO);
    }
    public seleccionarMedico(codigoMedico:number){
    this.agendarCitaDTO.idMedico = codigoMedico;
    }
    public cargarEspecialidad(){
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
          this.medicos = data.respuesta.map((medico: {nombre: string}) => medico.nombre);
        },
        error: error => {
          console.log(error);
        }
      });
    }

}



