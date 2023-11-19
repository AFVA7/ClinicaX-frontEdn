import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCitaDTO } from 'src/app/modelo/detalle-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {

  codigoCita: number = 0;
  cita!: DetalleCitaDTO;
  constructor(private route: ActivatedRoute, private citaService: CitaService) {
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
    });
    this.obtenerCita(this.codigoCita);
  }

  private obtenerCita(codigo: number) {
    this.citaService.obtenerCita(codigo).subscribe({
      next: data => {
        this.cita = data.respuesta;
        console.log(this.cita);
      },
      error: error => {
        console.log(error);
      }
    });
  }


}
