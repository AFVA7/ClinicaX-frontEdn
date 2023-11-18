import { Injectable } from '@angular/core';
import { RegistroMedicoDTO } from '../modelo/registro-medico-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoURL = "http://localhost:8080/api/medicos";
  constructor(private http: HttpClient) { }
  
}
