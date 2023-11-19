import { RespuestaPQRSDTO } from "./respuesta-pqrsdto";

export interface DetallePQRSDTO {
    codigo: number;
    estado: string;
    motivo: string;
    nombrePaciente: string;
    nombreMedico: string;
    especialidad: string;
    fechaDeCreacion: string;
    mensajes: RespuestaPQRSDTO[];
}
