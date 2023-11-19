import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { AdminComponent } from './pagina/admin/admin.component';
import { GestionaMedicosComponent } from './pagina/admin/gestiona-medicos/gestiona-medicos.component';
import { HistorialConsultasComponent } from './pagina/admin/historial-consultas/historial-consultas.component';
import { PacienteComponent } from './pagina/paciente/paciente.component';
import { AgendarComponent } from './pagina/paciente/agendar/agendar.component';
import { CancelarCitaComponent } from './pagina/paciente/cancelar-cita/cancelar-cita.component';
import { MedicoComponent } from './pagina/medico/medico.component';
import { AtenderCitaComponent } from './pagina/medico/atender-cita/atender-cita.component';
import { DiaLibreComponent } from './pagina/medico/dia-libre/dia-libre.component';
import { EliminarCuentaComponent } from './pagina/eliminar-cuenta/eliminar-cuenta.component';
import { CrearMedicoComponent } from './pagina/admin/gestiona-medicos/crear-medico/crear-medico.component';
import { HistorialPacienteComponent } from './pagina/historial-paciente/historial-paciente.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { GestionCitasComponent } from './pagina/gestion-citas/gestion-citas.component';
import { AgendarCitaComponent } from './pagina/agendar-cita/agendar-cita.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { AtencionCitaComponent } from './pagina/atencion-cita/atencion-cita.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { EditarPerfilComponent } from './pagina/editar-perfil/editar-perfil.component';
import { ResponderPqrsComponent } from './pagina/gestion-pqrs/responder-pqrs/responder-pqrs.component';
import { OlvidasteContrasenaComponent } from './pagina/login/olvidaste-contrasena/olvidaste-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    AdminComponent,
    GestionaMedicosComponent,
    HistorialConsultasComponent,
    PacienteComponent,
    AgendarComponent,
    CancelarCitaComponent,
    MedicoComponent,
    AtenderCitaComponent,
    DiaLibreComponent,
    EliminarCuentaComponent,
    CrearMedicoComponent,
    HistorialPacienteComponent,
    GestionPqrsComponent,
    CrearPqrsComponent,
    DetallePqrsComponent,
    GestionCitasComponent,
    AgendarCitaComponent,
    DetalleCitaComponent,
    AlertaComponent,
    AtencionCitaComponent,
    EditarPerfilComponent,
    ResponderPqrsComponent,
    OlvidasteContrasenaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
