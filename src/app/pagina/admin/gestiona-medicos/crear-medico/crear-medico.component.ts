import { Component } from '@angular/core';
import { HorarioDTO } from 'src/app/modelo/horario-dto';
import { RegistroMedicoDTO } from 'src/app/modelo/registro-medico-dto';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent {
  registroMedicoDTO: RegistroMedicoDTO;
  horarioDTO: HorarioDTO;
  archivos!:FileList;
  ciudades:string[];
  especialidades:string[];
  //lista de horarios
  horarios:HorarioDTO[];
  dias:string[];
  constructor(){
    this.registroMedicoDTO = new RegistroMedicoDTO();
    this.horarioDTO = new HorarioDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.especialidades = [];
    this.cargarEspecialidades();
    this.horarios = [];
    this.dias = [];
    this.cargarDias();
  }

  public registrar(){
    if(this.archivos != null && this.archivos.length > 0){
    console.log(this.registroMedicoDTO);
    }else{
    console.log("Debe cargar una foto");
    }
  }
  public sonIguales():boolean{
    return this.registroMedicoDTO.password == this.registroMedicoDTO.confirmaPassword;
  }
  public onFileChange(event:any){
    if (event.target.files.length > 0) {
    this.archivos = event.target.files;
    console.log(this.archivos);
    }
  }
  //eliminar horario dado un indice
  public eliminarHorario(i:number){
    this.registroMedicoDTO.horarios.splice(i,1);
  }
  //asignar horario desde el formulario
  public asignarHorario(){
    this.registroMedicoDTO.horarios.push(this.horarioDTO);
  }
  private cargarCiudades(){
    this.ciudades.push("Armenia");
    this.ciudades.push("Calarcá");
    this.ciudades.push("Pereira");
    this.ciudades.push("Manizales");
    this.ciudades.push("Medellín");
  }
  private cargarEspecialidades(){
    this.especialidades.push("Cardiologia");
    this.especialidades.push("Neurologia");
    this.especialidades.push("Psiquiatria");
    this.especialidades.push("Ortopedia");
    this.especialidades.push("Otorrinolaringologia");
  }
  private cargarDias(){
    this.dias.push("Lunes");
    this.dias.push("Martes");
    this.dias.push("Miercoles");
    this.dias.push("Jueves");
    this.dias.push("Viernes");
    this.dias.push("Sabado");
  }
}
