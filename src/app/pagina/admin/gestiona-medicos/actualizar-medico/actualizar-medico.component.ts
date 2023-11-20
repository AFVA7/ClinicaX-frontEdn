import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleMedicoDTO } from 'src/app/modelo/detalle-medico-dto';
import { AdminService } from 'src/app/servicios/admin.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-actualizar-medico',
  templateUrl: './actualizar-medico.component.html',
  styleUrls: ['./actualizar-medico.component.css']
})
export class ActualizarMedicoComponent {
  alerta!: Alerta
  detalleMedico: DetalleMedicoDTO = new DetalleMedicoDTO;
  archivos!: FileList;
  codigoMedico: number = 0;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
    this.route.params.subscribe(params => {
      this.codigoMedico = params['codigo'];
    });
    this.ObtenerMedico();
  }

  private ObtenerMedico() {
    this.adminService.obtenerMedico(this.codigoMedico).subscribe({
      next: data => {
        this.detalleMedico = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

 
  public actualizarMedico() {
    if (this.detalleMedico.urlFoto.length != 0) {
      this.adminService.actualizarMedico(this.detalleMedico).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: "Debe subir una imagen", tipo: "danger" };
    }
  }

  public eliminarMedico() {
    this.adminService.eliminarMedico(this.codigoMedico).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
    this.router.navigate(['/listar-medicos']);

  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.detalleMedico.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

}
