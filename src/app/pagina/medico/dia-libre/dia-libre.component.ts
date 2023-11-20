import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DiaLibreDTO } from 'src/app/modelo/dia-libre-dto';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-dia-libre',
  templateUrl: './dia-libre.component.html',
  styleUrls: ['./dia-libre.component.css']
})
export class DiaLibreComponent {
  fechaSeleccionada: string;
  motivo: string;
  codigoMedico: number = 0;
  alerta!: Alerta;
  diaLibreDTO: DiaLibreDTO = new DiaLibreDTO();

  constructor(private MedicoService: MedicoService, private tokenService: TokenService) {
    this.fechaSeleccionada = '';
    this.motivo = '';
    this.codigoMedico = this.tokenService.getCodigo();
  }

  registrarDiaLibre() {
    this.setearDatos();
    console.log(this.diaLibreDTO);
    this.MedicoService.registrarDiaLibre(this.diaLibreDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public setearDatos() {
    this.diaLibreDTO.codigoMedico = this.codigoMedico;
    this.diaLibreDTO.fecha = this.fechaSeleccionada;
    this.diaLibreDTO.motivo = this.motivo;
  }

}
