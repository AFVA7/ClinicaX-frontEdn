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
import { ResponderPQRSComponent } from './pagina/admin/responder-pqrs/responder-pqrs.component';
import { PacienteComponent } from './pagina/paciente/paciente.component';
import { AgendarComponent } from './pagina/paciente/agendar/agendar.component';
import { CancelarCitaComponent } from './pagina/paciente/cancelar-cita/cancelar-cita.component';
import { CrearPQRSComponent} from './pagina/paciente/crear-pqrs/crear-pqrs.component';
import { RecuperarPasswdComponent} from './pagina/paciente/recuperar-passwd/recuperar-passwd.component';
import { MedicoComponent } from './pagina/medico/medico.component';
import { AtenderCitaComponent } from './pagina/medico/atender-cita/atender-cita.component';
import { DiaLibreComponent } from './pagina/medico/dia-libre/dia-libre.component';
import { EditarComponent } from './pagina/editar/editar.component';
import { EliminarCuentaComponent } from './pagina/eliminar-cuenta/eliminar-cuenta.component';
import { CrearMedicoComponent } from './pagina/admin/gestiona-medicos/crear-medico/crear-medico.component';
import { HistorialPacienteComponent } from './pagina/historial-paciente/historial-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    AdminComponent,
    GestionaMedicosComponent,
    HistorialConsultasComponent,
    ResponderPQRSComponent,
    PacienteComponent,
    AgendarComponent,
    CancelarCitaComponent,
    CrearPQRSComponent,
    RecuperarPasswdComponent,
    MedicoComponent,
    AtenderCitaComponent,
    DiaLibreComponent,
    EditarComponent,
    EliminarCuentaComponent,
    CrearMedicoComponent,
    HistorialPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
