import { Component } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/item-pqrsdto';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { Alerta } from 'src/app/modelo/alerta';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-gestion-pqrs',
  templateUrl: './gestion-pqrs.component.html',
  styleUrls: ['./gestion-pqrs.component.css']
})
export class GestionPqrsComponent {
  pqrs: ItemPQRSDTO[];
  alerta!: Alerta;
  mostrarResponderPqrs: boolean = false;
  pqrsCodigo: number = 0;
  esAdmin: boolean = false;
  constructor(private pacienteService: PacienteService, private tokenService: TokenService, private pqrsService: PqrsService, private adminService: AdminService) {
    this.pqrs = [];

  }

  ngOnInit(): void {
    this.esAdmin = this.tokenService.esAdmin();
    if (this.esAdmin) {
      this.listarPqrs();
    } else {
      this.listarPqrsDeUnPaciente();
    }
  }
  public listarPqrs() {
    this.adminService.listarPQRS().subscribe({
      next: data => {
        this.pqrs = data.respuesta;
      },
      error: error => {
        console.log(error);
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public listarPqrsDeUnPaciente() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarPQRSPaciente(codigo).subscribe({
      next: data => {
        this.pqrs = data.respuesta;
      },
      error: error => {
        console.log(error);
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  responderPQRS(codigo: number) {
    this.mostrarResponderPqrs = true;
    this.pqrsCodigo = codigo;
  }
  cerrarFormularioRespuesta() {
    this.mostrarResponderPqrs = false;
  }
}