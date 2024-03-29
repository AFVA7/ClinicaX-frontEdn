import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleAtencionDTO } from 'src/app/modelo/detalle-atencion-dto';
import { ItemAtencionDTO } from 'src/app/modelo/item-atencion-dto';
import { AtencionesService } from 'src/app/servicios/atenciones.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historial-de-atenciones',
  templateUrl: './historial-de-atenciones.component.html',
  styleUrls: ['./historial-de-atenciones.component.css']
})
export class HistorialDeAtencionesComponent {
  atenciones: ItemAtencionDTO[];
  codigoMedico: number = 0;
  alerta!: Alerta;
  detalleAtencion!: DetalleAtencionDTO;


  constructor(private medicoService: MedicoService, private tokenService: TokenService, private atencionService: AtencionesService){
    this.atenciones = [];
  }

  ngOnInit(): void {
    this.codigoMedico = this.tokenService.getCodigo();
    this.historialDeAtencionesDeUnMedico();
  }


  public historialDeAtencionesDeUnMedico(){
    this.medicoService.historialDeAtencionesDeUnMedico(this.codigoMedico).subscribe({
      next: data => {
        this.atenciones = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public verDetalleAtencion(codigo: number){
    this.atencionService.verDetalleAtencion(codigo).subscribe({
      next: data => {
        this.detalleAtencion = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
