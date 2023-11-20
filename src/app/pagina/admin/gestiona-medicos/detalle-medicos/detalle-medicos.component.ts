import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleMedicoDTO } from 'src/app/modelo/detalle-medico-dto';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-detalle-medicos',
  templateUrl: './detalle-medicos.component.html',
  styleUrls: ['./detalle-medicos.component.css']
})
export class DetalleMedicosComponent {
  detalleMedico: DetalleMedicoDTO = new DetalleMedicoDTO();
  codigoMedico: number = 0;
  alerta!: Alerta
  constructor(private route: ActivatedRoute, private adminService: AdminService) {
    this.route.params.subscribe(params => {
      this.codigoMedico = params['codigo'];
    });
    this.ObtenerMedico();
  }

  private ObtenerMedico(){
    this.adminService.obtenerMedico(this.codigoMedico).subscribe({
      next: data => {
        this.detalleMedico = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }
}

