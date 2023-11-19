import { Component } from '@angular/core';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css']
})
export class GestionCitasComponent {
  codigoPaciente: number;

  citas: ItemCitaDTO[];
  constructor(private citaService: CitaService, private tokenService: TokenService) {
    this.citas = [];
    this.codigoPaciente = this.tokenService.getCodigo();
    this.listarCitas(this.codigoPaciente);
  }

  private listarCitas(codigo: number) {
    this.citaService.listar(codigo).subscribe({
      next: data => {
        console.log("este es el código: " + codigo);
        console.log(data);
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
