import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {

  codigoCita: string = "";
  cita: ItemCitaDTO | undefined;
  constructor(private route: ActivatedRoute, private citaService: CitaService) {
    this.route.params.subscribe(params => {
      this.codigoCita = params['codigo'];
      let citaConsultada = citaService.obtener(parseInt(this.codigoCita));
      if (citaConsultada != undefined) {
        this.cita = citaConsultada;
      }
    });
  }

}
