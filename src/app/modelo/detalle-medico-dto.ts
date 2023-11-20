import { HorarioDTO } from "./horario-dto"

export class DetalleMedicoDTO {
    codigo: number = 0
    nombre: number = 0
    cedula: string = ''
    ciudad: string = ''
    especialidad: string = ''
    telefono: string = ''
    correo: string = ''
    urlFoto: string = ''
    horarios: HorarioDTO[] = []
}
