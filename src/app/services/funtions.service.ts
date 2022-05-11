import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgInformationComponent } from '../components/msg-information/msg-information.component';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FuntionsService {

  constructor(
    private dialog: MatDialog
  ) { }

  mensajeError(mensaje: any, bug: boolean = false){
    let msj = bug ? mensaje.message : mensaje;
    
    this.dialog.open(MsgInformationComponent, {
      data: {
        tipo: 'error',
        cabecera: 'Error',
        detalle: msj
      }
    });
  }

  mensajeInformacion(mensaje: string){
    this.dialog.open(MsgInformationComponent, {
      data: {
        tipo: 'informacion',
        cabecera: 'Mensaje',
        detalle: mensaje
      }
    });
  }

  dataUser(){
    return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("coffee"))))
  }

  public fechaDB( dato: any) {
    return moment(dato, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  public invalid( dato:string , form:FormGroup ){
    return form.get(dato)?.errors && form.get(dato)?.touched;
  }

  public Empty_data(forma: FormGroup) {

    return Object.values(forma.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(control => control.markAsTouched());
      }
      else {
        control.markAsTouched();
      }
    })
  }

  public vacio(value: any){
    if(String(value) == "") return true;

    if(value == 0) {
      console.log("cayo 0");
      return false;
    }

    if(value == null) return true;

    if(value == undefined) return true;

    if(!value) return true;

    return false;
  }
}
