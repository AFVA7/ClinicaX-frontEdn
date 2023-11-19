import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DetallePacienteDTO } from 'src/app/modelo/detalle-paciente-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenDTO } from 'src/app/modelo/token-dto';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})

export class EditarPerfilComponent {
  detallePacienteDTO: DetallePacienteDTO;
  ciudades: string[];
  eps: string[];
  tipoSangre: string[];
  archivos!: FileList;
  urlFoto: string | ArrayBuffer | null = null;
  alerta!: Alerta;

  constructor(private pacienteService: PacienteService, private authService: AuthService, private clinicaService: ClinicaService, private imagenService: ImagenService, private tokenService: TokenService, private router: Router) {
    this.detallePacienteDTO = new DetallePacienteDTO();
    this.obtenerDatosPaciente();
    this.ciudades = [];
    this.cargarCiudades();
    this.eps = [];
    this.cargarEps();
    this.tipoSangre = [];
    this.cargarTipoSangre();

  }

  public obtenerDatosPaciente() {

    let codigo = this.tokenService.getCodigo();

    this.pacienteService.verDetallePaciente(codigo).subscribe({
      next: data => {
        this.detallePacienteDTO = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }

    });
  }

  public editarPerfil() {
    if (this.detallePacienteDTO.urlFoto.length != 0) {
      this.pacienteService.editarPerfil(this.detallePacienteDTO).subscribe({
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


  public refreshToken() {

    if (this.tokenService.getToken() != null && this.tokenService.getRefreshToken() != null) {

      const tokenActual: string = this.tokenService.getToken()!;
      const refreshTokenActual: string = this.tokenService.getRefreshToken()!;

      const tokenDTO: TokenDTO = { token: tokenActual, refreshToken: refreshTokenActual };

      this.authService.refresh(tokenDTO).subscribe({
        next: data => {
          this.tokenService.login(data.respuesta.token, data.respuesta.refreshToken);
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });

    }

  }

  public eliminarCuenta() {
    this.pacienteService.eliminarCuenta(this.tokenService.getCodigo()).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
        this.tokenService.logout();
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  private cargarEps() {
    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  private cargarTipoSangre() {
    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tipoSangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.detallePacienteDTO.urlFoto = data.respuesta.url;
          this.urlFoto = data.respuesta.url;
        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.detallePacienteDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }
}
