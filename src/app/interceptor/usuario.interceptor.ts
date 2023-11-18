import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { TokenService } from '../servicios/token.service';
import { AuthService } from '../servicios/auth.service';
import { TokenDTO } from '../modelo/token-dto';

const AUTHORIZATION = "Authorization";
const BEARER = "Bearer ";

@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.includes("api/auth");
    const urlClinica = req.url.includes("api/clinica");
    if (!this.tokenService.isLogged() || isApiUrl || urlClinica) {
      return next.handle(req);
    }

    const token = this.tokenService.getToken();
    const initReq = this.addToken(req, token!);

    return next.handle(initReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => err);
        }
      })
    );

  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + token) });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenDTO: TokenDTO = { token: this.tokenService.getToken()!, refreshToken: '' };

    return this.authService.refresh(tokenDTO).pipe(
      concatMap((data) => {
        this.tokenService.setToken(data.respuesta.token, data.respuesta.refreshToken);
        const updatedReq = this.addToken(req, data.respuesta.token);
        return next.handle(updatedReq);
      })
    );
  }
}