import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from '../modelo/item-pqrsdto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  private clinicaURL = "http://localhost:8080/api/clinica";
  private pacienteURL = "http://localhost:8080/api/pacientes";
  
  constructor(private http: HttpClient) {
  }

  // public listar(): ItemPQRSDTO[] {
  //   return this.pqrs;
  // }
  // public obtener(codigo: number): ItemPQRSDTO | undefined {
  //   return this.pqrs.find(pqrs => pqrs.codigo == codigo);
  // }
  public crear(pqrs: RegistroPQRSDTO) {
    return this.http.post<MensajeDTO>(`${this.pacienteURL}/crear-pqrs`, pqrs);
  }
  
  public listarTiposPQRS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/lista-tipo-pqrs`);
  }
}
