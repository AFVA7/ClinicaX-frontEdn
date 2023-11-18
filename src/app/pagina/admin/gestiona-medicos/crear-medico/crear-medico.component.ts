import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { HorarioDTO } from 'src/app/modelo/horario-dto';
import { RegistroMedicoDTO } from 'src/app/modelo/registro-medico-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent {
  registroMedicoDTO: RegistroMedicoDTO;
  archivos!: FileList;
  ciudades: string[];
  especialidades: string[];
  //lista de horarios
  horarios: HorarioDTO[];
  dias: string[];
  alerta!: Alerta;
  constructor(private clinicaService: ClinicaService, private imagenService: ImagenService, private adminService: AdminService) {
    this.registroMedicoDTO = new RegistroMedicoDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.especialidades = [];
    this.cargarEspecialidades();
    this.horarios = [];
    this.dias = [];
    this.cargarDias();
  }

  public registrar() {
    if (this.registroMedicoDTO.urlFoto.length != 0) {
      console.log(this.registroMedicoDTO.urlFoto)
      this.adminService.registrarMedico(this.registroMedicoDTO).subscribe({
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
  public sonIguales(): boolean {
    return this.registroMedicoDTO.password == this.registroMedicoDTO.confirmaPassword;
  }
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.registroMedicoDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }
  //eliminar horario dado un indice
  public eliminarHorario(i: number) {
    this.registroMedicoDTO.horarios.splice(i, 1);
  }
  //asignar horario desde el formulario
  public asignarHorario() {
    this.registroMedicoDTO.horarios.push( new HorarioDTO() );
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
  private cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  private cargarDias() {
    this.dias.push("Lunes");
    this.dias.push("Martes");
    this.dias.push("Miercoles");
    this.dias.push("Jueves");
    this.dias.push("Viernes");
    this.dias.push("Sabado");
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroMedicoDTO.urlFoto = data.respuesta.url;
        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }
}
