import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from '../modelo/item-pqrsdto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  pqrs: ItemPQRSDTO[];
  constructor() {
    this.pqrs = [];
    this.pqrs.push({
      codigo: 1, estado: 'ACTIVO', motivo: 'Solicitud de información', fecha:
        '2023-10-12'
    });
    this.pqrs.push({
      codigo: 2, estado: 'ACTIVO', motivo: 'Solicitud de cambio de fecha',
      fecha: '2023-09-29'
    });
    this.pqrs.push({
      codigo: 3, estado: 'CERRADO', motivo: 'Solicitud de información', fecha:
        '2023-11-01'
    });
    this.pqrs.push({
      codigo: 4, estado: 'ACTIVO', motivo: 'Queja sobre médico', fecha:
        '2023-09-07'
    });
  }
  public listar(): ItemPQRSDTO[] {
    return this.pqrs;
  }
  public obtener(codigo: number): ItemPQRSDTO | undefined {
    return this.pqrs.find(pqrs => pqrs.codigo == codigo);
  }
  public crear(pqrs: RegistroPQRSDTO) {
    let codigo = this.pqrs.length + 1;
    this.pqrs.push({
      codigo: codigo, estado: 'ACTIVO', motivo: pqrs.motivo, fecha: new
        Date().toISOString()
    });
  }
}
