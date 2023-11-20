import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemMedicoDTO } from 'src/app/modelo/item-medico-dto';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css']
})
export class ListarMedicosComponent {
  listaMedicos!: ItemMedicoDTO[]
  alerta!: Alerta 

  constructor(private adminService: AdminService) {
    this.listarMedicos();
  }

  private listarMedicos() {
    this.adminService.listarMedicos().subscribe({
      next: data => {
        this.listaMedicos = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
