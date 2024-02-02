import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaParaPQRSDTO } from 'src/app/modelo/item-cita-para-pqrsdto';
import { RegistroPQRSDTO } from 'src/app/modelo/registro-pqrsdto';
import { CitaService } from 'src/app/servicios/cita.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-pqrs',
  templateUrl: './crear-pqrs.component.html',
  styleUrls: ['./crear-pqrs.component.css']
})
export class CrearPqrsComponent {
  registroPQRSDTO: RegistroPQRSDTO;
  tiposPQRS: string[];
  codigoPaciente: number;
  citas: ItemCitaParaPQRSDTO[];
  alerta!: Alerta;
  codigoCita: number;

  constructor(private pqrsService: PqrsService, private citaService: CitaService, private tokenService: TokenService) {
    this.registroPQRSDTO = new RegistroPQRSDTO();
    this.tiposPQRS = [];
    this.citas = [];
    this.cargarTiposPQRS();
    this.codigoPaciente = this.tokenService.getCodigo();
    this.cargarCitas(this.codigoPaciente);
    this.codigoCita = 0;
  }

  public crearPqrs() {
    this.pqrsService.crear(this.registroPQRSDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  

  public seleccionar(codigoCita: number) {
    this.registroPQRSDTO.codigoCita = codigoCita;
    this.registroPQRSDTO.codigoPaciente = this.codigoPaciente;
  }

  public cargarTiposPQRS() {
    this.pqrsService.listarTiposPQRS().subscribe({
      next: data => {
        this.tiposPQRS = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  public cargarCitas(codigo: number) {
    this.citaService.listarParaPQRS(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta.map((cita: any) => ({
          codigo: cita.codigoCita,
          especialidad: cita.especialidad,
          fecha: cita.fecha,
          medico: cita.nombreMedico
        }));
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
}
