import { Component } from '@angular/core';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css']
})
export class GestionCitasComponent {

  citas: ItemCitaDTO[];
  constructor(private citaService: CitaService) {
    this.citas = citaService.listar();
  }

}
