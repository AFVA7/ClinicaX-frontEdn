import { Component } from '@angular/core';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  registroPacienteDTO: RegistroPacienteDTO;
  ciudades:string[];
  eps:string[];
  tipoSangre:string[];
  archivos!:FileList;
  constructor(){
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.eps = [];
    this.cargarEps();
    this.tipoSangre = [];
    this. cargarTipoSangre()
  }
  public registrar(){
    if(this.archivos != null && this.archivos.length > 0){
    console.log(this.registroPacienteDTO);
    }else{
    console.log("Debe cargar una foto");
    }
  }
  
  public sonIguales():boolean{
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  } 
  public onFileChange(event:any){
    if (event.target.files.length > 0) {
    this.archivos = event.target.files;
    console.log(this.archivos);
    }
  }
  private cargarCiudades(){
    this.ciudades.push("Armenia");
    this.ciudades.push("Calarcá");
    this.ciudades.push("Pereira");
    this.ciudades.push("Manizales");
    this.ciudades.push("Medellín");
  }
  private cargarEps(){
    this.eps.push("SANITAS");
    this.eps.push("NUEVA EPS");
    this.eps.push("SALUCOOP");
  }
  private cargarTipoSangre(){
    this.tipoSangre.push("O_POSITIVO");
    this.tipoSangre.push("A_NEGATIVO");
  }
}
