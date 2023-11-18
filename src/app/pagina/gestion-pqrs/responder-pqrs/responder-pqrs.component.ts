import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-responder-pqrs',
  templateUrl: './responder-pqrs.component.html',
  styleUrls: ['./responder-pqrs.component.css']
})
export class ResponderPqrsComponent {
  @Input() pqrsCodigo: number; // código del PQR al que se va a responder
  respuesta: string = '';
  @Output() cerrarFormulario = new EventEmitter<void>();
  constructor() {
    this.pqrsCodigo = 0;
  }
  responderPQR() {
    // Lógica para enviar la respuesta, puedes llamar a un servicio para manejar esto.
    // Aquí puedes manejar la lógica de envío de respuesta al servidor.
    console.log(`Respondiendo al PQR ${this.pqrsCodigo} con respuesta: ${this.respuesta}`);
    // cerrar el modal o realizar otras acciones después de enviar la respuesta.
    this.cerrarFormulario.emit();
  }


}

 

