import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/login-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-olvidaste-contrasena',
  templateUrl: './olvidaste-contrasena.component.html',
  styleUrls: ['./olvidaste-contrasena.component.css']
})
export class OlvidasteContrasenaComponent {
  alerta!: Alerta;
  loginDTO: LoginDTO;
  email: string = '';

  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.loginDTO = new LoginDTO();
  }

  public recuperarContrasena() {
    console.log('Enviar correo de recuperación a: ' + this.email);
    this.authService.recuperarContrasena(this.email).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success'};
      },
      error: err => {
        this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };      
      }
    })
  }
  
  public login() {
    this.authService.login(this.loginDTO).subscribe({
      next: data => {
        console.log(data)
        this.tokenService.login(data.respuesta.token, data.respuesta.refreshToken);
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}

