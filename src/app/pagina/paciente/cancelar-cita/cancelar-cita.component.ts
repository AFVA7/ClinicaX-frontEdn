import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CancelamientoCitaDTO } from 'src/app/modelo/cancelamienti-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.css']
})
export class CancelarCitaComponent {
  codigoCita: number = 0;
  cancelamientoDTO: CancelamientoCitaDTO;
  alerta!: Alerta;
  motivos: string[];
  

  constructor(private route: ActivatedRoute, private citaService: CitaService, private clinicaService: ClinicaService) {
    this.cancelamientoDTO = new CancelamientoCitaDTO();
    this.motivos = [];
    this.cargarMotivos();
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
    });
    this.cancelamientoDTO.idCita = this.codigoCita;
   }

  public cancelarCita() {
    console.log(this.cancelamientoDTO);
    this.citaService.cancelarCita(this.cancelamientoDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  private cargarMotivos() {
    this.clinicaService.listarMotivosDeCancelamiento().subscribe({
      next: data => {
        this.motivos = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}

