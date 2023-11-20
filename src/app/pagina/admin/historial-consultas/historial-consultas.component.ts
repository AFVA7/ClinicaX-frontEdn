import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleCitaDTO } from 'src/app/modelo/detalle-cita-dto';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historial-consultas',
  templateUrl: './historial-consultas.component.html',
  styleUrls: ['./historial-consultas.component.css']
})
export class HistorialConsultasComponent {
  citas: ItemCitaDTO[];
  codigoCita = 0;
  citaSeleccionada!: DetalleCitaDTO;
  alerta!: Alerta;

  constructor(private citaService: CitaService, private route: ActivatedRoute) {
    this.citas = [];
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
    });
    this.obtenerCita(this.codigoCita);

  }
 
  //cargar el historial del paciente relacionado a esa cita
  public cargarHistorial(codigo: number) {
    this.citaService.listarHistorialPaciente(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
  public obtenerCita(codigo: number) {
    this.citaService.obtenerCita(codigo).subscribe({
      next: data => {
        this.citaSeleccionada = data.respuesta;
        this.cargarHistorial(this.citaSeleccionada.codigoPaciente)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  

}
