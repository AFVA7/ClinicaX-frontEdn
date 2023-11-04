import { Component } from '@angular/core';
import { LoginDTO } from 'src/app/modelo/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDTO: LoginDTO;
  constructor(){
    this.loginDTO = new LoginDTO();
  }

  public login(){
    console.log(this.loginDTO);
  }
}

