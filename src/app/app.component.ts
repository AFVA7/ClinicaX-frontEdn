import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //SE PUEDE HACER TANTO CON VARIABLES SIMPLES(int String, bolean) COMO LISTAS Y OBJETOS 
  title = 'clinica-uq-frontend';
  isLogged = false;
  email: string = "";
  rol: string[] = [];

  subTitle = 'BIENVENIDO A LA CLINICA UNIVERSIDAD DEL QUINDIO';

  constructor(private tokenService: TokenService) { }
  
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.rol = this.tokenService.getRole();
    }
  }

  public logout() {
    this.tokenService.logout();
  }
  
}
