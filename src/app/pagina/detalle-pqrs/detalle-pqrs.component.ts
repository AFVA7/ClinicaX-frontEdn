import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallePQRSDTO } from 'src/app/modelo/detalle-pqrsdto';
import { ItemPQRSDTO } from 'src/app/modelo/item-pqrsdto';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-pqrs',
  templateUrl: './detalle-pqrs.component.html',
  styleUrls: ['./detalle-pqrs.component.css']
})
export class DetallePqrsComponent {
  codigoPqrs: number = 0;
  pqrs!: DetallePQRSDTO;


  constructor(private route: ActivatedRoute, private pqrsService: PqrsService) {
    this.route.params.subscribe(params => {
      this.codigoPqrs = params['codigo'];
    });
    this.obtener(this.codigoPqrs);
  }

  private obtener(codigo: number) {
    this.pqrsService.obtener(codigo).subscribe({
      next: data => {
        this.pqrs = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
