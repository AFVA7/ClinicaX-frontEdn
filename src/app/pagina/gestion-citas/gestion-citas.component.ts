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
  codigoMedico: number;
  citas: ItemCitaDTO[];
  mostrarSoloPendientes: boolean = false;
  mostrarHistorial: boolean = false;
  esMedico: boolean = false;
  constructor(private citaService: CitaService, private tokenService: TokenService) {
    this.citas = [];
    this.codigoPaciente = this.tokenService.getCodigo();
    this.codigoMedico = this.tokenService.getCodigo();
  }

  ngOnInit(): void {
    this.esMedico = this.tokenService.esMedico();
    if (this.esMedico) {
      this.listarCitasMedico();
    }else{
      this.listarTodasLasCitas(this.codigoPaciente);
    }
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
    this.obtenerCitasPendientes(this.codigoPaciente);
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

  private listarCitasMedico() {
    this.citaService.listarCitasMedico(this.codigoMedico).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
