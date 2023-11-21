import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtencionesService {
  private atencionUrl = "http://localhost:8080/api/atenciones";

  constructor(private http: HttpClient) { }

  public verDetalleAtencion(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.atencionUrl}/detalle/${codigoPaciente}`);
  }
}
