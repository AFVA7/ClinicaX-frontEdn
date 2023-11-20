import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { GestionCitasComponent } from './pagina/gestion-citas/gestion-citas.component';
import { AgendarCitaComponent } from './pagina/agendar-cita/agendar-cita.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { GestionaMedicosComponent } from './pagina/admin/gestiona-medicos/gestiona-medicos.component';
import { EditarPerfilComponent } from './pagina/editar-perfil/editar-perfil.component';
import { CrearMedicoComponent } from './pagina/admin/gestiona-medicos/crear-medico/crear-medico.component';
import { ResponderPqrsComponent } from './pagina/gestion-pqrs/responder-pqrs/responder-pqrs.component';
import { OlvidasteContrasenaComponent } from './pagina/login/olvidaste-contrasena/olvidaste-contrasena.component';
import { CancelarCitaComponent } from './pagina/paciente/cancelar-cita/cancelar-cita.component';
import { AtenderCitaComponent } from './pagina/medico/atender-cita/atender-cita.component';
import { DiaLibreComponent } from './pagina/medico/dia-libre/dia-libre.component';
import { HistorialConsultasComponent } from './pagina/admin/historial-consultas/historial-consultas.component';
const routes: Routes = [
    
    { path: "", component: InicioComponent },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
    { path: "detalle/:id", component: RegistroComponent },
    { path: "olvidaste-contrasena", component: OlvidasteContrasenaComponent },
    {
        path: "cancelar-cita/:codigo", component: CancelarCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "historial-medico/:codigo", component: HistorialConsultasComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MEDICO"]
        }
    },{
        path: "cancelar-cita/:codigo", component: CancelarCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "dia-libre", component: DiaLibreComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MEDICO"]
        }
    },
    {
        path: "gestion-pqrs", component: GestionPqrsComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE", "ADMIN"]
        }
    },
    {
        path: "crear-pqrs", component: CrearPqrsComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "detalle-pqrs/:codigo", component: DetallePqrsComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["PACIENTE", "ADMIN"] }
    },
    {
        path: "atender-cita/:codigo", component: AtenderCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MEDICO"]
        }
    },
    {
        path: "gestion-medicos", component: GestionaMedicosComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["ADMIN"]
        }
    },
    {
        path: "gestion-citas", component: GestionCitasComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE", "MEDICO"]
        }
    },
    {
        path: "agendar-cita", component: AgendarCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "detalle-cita/:codigo", component: DetalleCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "editar-perfil", component: EditarPerfilComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["PACIENTE"]
        }
    },
    {
        path: "crear-medico", component: CrearMedicoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["ADMIN"]
        }
    },
    {
        path: "responder-pqrs", component: ResponderPqrsComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["ADMIN"]
        }
    },
    { path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }