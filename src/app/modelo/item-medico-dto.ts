import { HorarioDTO } from "./horario-dto";

export interface ItemMedicoDTO {
    codigo: number;
    nombre: string;
    urlFoto: string;
    especialidad: string;
    horarios: HorarioDTO[];
}
