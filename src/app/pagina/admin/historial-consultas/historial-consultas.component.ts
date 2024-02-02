import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleAtencionDTO } from 'src/app/modelo/detalle-atencion-dto';
import { DetalleCitaDTO } from 'src/app/modelo/detalle-cita-dto';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { AtencionesService } from 'src/app/servicios/atenciones.service';
import { CitaService } from 'src/app/servicios/cita.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
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
  codigoPaciente: number = 0; 
  detalleAtencion!: DetalleAtencionDTO;
  esMedico: boolean = false;

  constructor(private citaService: CitaService, private route: ActivatedRoute, private tokenService: TokenService, private pacienteService: PacienteService, private atencionService: AtencionesService) {
    this.citas = [];
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
    });
    this.codigoPaciente = this.tokenService.getCodigo();
    

  }

  ngOnInit(): void {
    this.esMedico = this.tokenService.esMedico();
    if (this.esMedico) {
      this.obtenerCita(this.codigoCita);
    }else{
      this.cargarHistorial(this.codigoPaciente);
    }
  }

  public verDetalleAtencion(codigo: number){
    this.atencionService.verDetalleAtencionRelacionadoACita(codigo).subscribe({
      next: data => {
        this.detalleAtencion = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
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
