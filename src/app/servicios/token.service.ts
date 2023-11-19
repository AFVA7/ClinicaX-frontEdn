import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";
const REFRESH_TOKEN_KEY = "AuthRefreshToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  public setToken(token: string, refreshToken: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public esAdmin(): boolean {
    const roles = this.getRole();
    return roles.includes('ADMIN'); 
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string, refreshToken: string) {
    this.setToken(token, refreshToken);
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
  public getCodigo(): number {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.Uid;
    }
    return 0;
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
  }
//antes tenía values.rol pero tuve que hacerlo con values.roles y si veo en consola me sale un array con los roles
  public getRole(): string[] {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      console.log(values.roles);
      return values.roles;
    }
    return [];
  }
}
