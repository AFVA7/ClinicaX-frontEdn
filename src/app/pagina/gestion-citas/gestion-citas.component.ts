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
  mostrarSoloPendientes: boolean = false;
  mostrarHistorial: boolean = false;
  constructor(private citaService: CitaService, private tokenService: TokenService) {
    this.citas = [];
    this.codigoPaciente = this.tokenService.getCodigo();
    this.listarTodasLasCitas(this.codigoPaciente);
    this.obtenerCitasPendientes(this.codigoPaciente);
  }

  private obtenerCitasPendientes(codigo: number) {
    this.citaService.obtenerCitasPendientes(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  toggleMostrarSoloPendientes() {
    this.mostrarSoloPendientes = !this.mostrarSoloPendientes;
  }
  toggleMostrarHistorial() {
    this.mostrarHistorial = !this.mostrarHistorial;
  }

  getCitasFiltradas() {
    if (this.mostrarSoloPendientes) {
      return this.citas.filter(item => item.estadoCita === 'PROGRAMADA');
    } else if (this.mostrarHistorial) {
      return this.citas.filter(item => item.estadoCita === 'CANCELADA' || item.estadoCita === 'COMPLETADA');
    }
      return this.citas;
  }

  private listarTodasLasCitas(codigo: number) {
    this.citaService.listar(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
