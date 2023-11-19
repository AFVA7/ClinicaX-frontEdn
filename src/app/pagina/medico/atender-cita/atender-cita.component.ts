import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleCitaDTO } from 'src/app/modelo/detalle-cita-dto';
import { RegistroAtencionDTO } from 'src/app/modelo/registro-atencion-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-atender-cita',
  templateUrl: './atender-cita.component.html',
  styleUrls: ['./atender-cita.component.css']
})
export class AtenderCitaComponent {
  alerta!: Alerta;
  codigoCita: number = 0;
  citaSeleccionada!: DetalleCitaDTO;
  registroAtencionDTO: RegistroAtencionDTO = new RegistroAtencionDTO();
  codigoMedico: number = 0;
  constructor(private route: ActivatedRoute, private citaService: CitaService, private tokenService: TokenService, private medicoService: MedicoService) {
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
    });
    this.codigoMedico = this.tokenService.getCodigo();
    this.obtenerCita(this.codigoCita);
  }

  public obtenerCita(codigo: number) {
    this.citaService.obtenerCita(codigo).subscribe({
      next: data => {
        this.citaSeleccionada = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public atenderCita() {
    this.registroAtencionDTO.codigoCita = this.codigoCita;
    this.registroAtencionDTO.codigoMedico = this.codigoMedico;
    this.medicoService.atenderCita(this.registroAtencionDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
}


