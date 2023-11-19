import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroRespuestaDTO } from 'src/app/modelo/registro-respuesta-dto';
import { RespuestaPQRSDTO } from 'src/app/modelo/respuesta-pqrsdto';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-responder-pqrs',
  templateUrl: './responder-pqrs.component.html',
  styleUrls: ['./responder-pqrs.component.css']
})
export class ResponderPqrsComponent {
  @Input() pqrsCodigo!: number; // código del PQR al que se va a responder
  mensajes: RespuestaPQRSDTO[] = [];
  mensajesAdmin: RespuestaPQRSDTO[];
  mensajesPaciente: RespuestaPQRSDTO[];
  registroRespuesta: RegistroRespuestaDTO = new RegistroRespuestaDTO();
  @Output() cerrarFormulario = new EventEmitter<void>();
  codigoCuenta: number;
  codigoMensaje: number = 0;
  alerta!: Alerta;
  constructor(private pqrsService: PqrsService, private tokenService: TokenService) {
    this.mensajesAdmin = [];
    this.mensajesPaciente = [];
    this.codigoCuenta = this.tokenService.getCodigo();

  }

  //suscribirse a los cambios
  ngOnChanges(changes: SimpleChanges): void {
    if ('pqrsCodigo' in changes) {
      this.listarTodosLosMensajes();
      this.cargarMensajes();
    }
  }
  public listarTodosLosMensajes() {
    this.pqrsService.listarMensajes(this.pqrsCodigo).subscribe({
      next: data => {
        this.mensajes = data.respuesta;
        const ultimoMensaje = this.mensajes[this.mensajes.length - 1];
        if (ultimoMensaje) {
          this.codigoMensaje = ultimoMensaje.codigoMensaje;
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  public cargarMensajes() {
    this.pqrsService.listarMensajes(this.pqrsCodigo).subscribe({
      next: data => {
        // Filtrar mensajes del administrador
        this.mensajesAdmin = data.respuesta.filter((mensaje: RespuestaPQRSDTO) => mensaje.nombreUsuario.toLowerCase().startsWith('admin'));
        // Filtrar mensajes del paciente
        this.mensajesPaciente = data.respuesta.filter((mensaje: RespuestaPQRSDTO) => !mensaje.nombreUsuario.toLowerCase().startsWith('admin'));
        // Obtener el código del último mensaje del paciente
      },
      error: error => {
        console.log(error);
      }
    });
  }


  public responderPQR() {
    this.setearDatos();
    this.pqrsService.responder(this.registroRespuesta).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
        this.listarTodosLosMensajes();
        this.cargarMensajes();
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
    this.registroRespuesta.mensaje = '';
    this.cerrarFormulario.emit();
  }

  private setearDatos() {
    this.registroRespuesta.codigoCuenta = this.codigoCuenta;
    this.registroRespuesta.codigoPQRS = this.pqrsCodigo;
    this.registroRespuesta.codigoMensaje = this.codigoMensaje;
  }
}



