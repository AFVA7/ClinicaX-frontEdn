import { HorarioDTO } from "./horario-dto";

export class RegistroMedicoDTO {
    nombre:string = "";
    cedula:string = "";
    ciudad:string = "";
    especialidad:string = "";
    telefono:string = "";
    correo:string = "";
    password:string = "";
    urlFoto:string = "";
    confirmaPassword:string = "";
    //lista de horarios
    horarios:HorarioDTO[] = [];
}
