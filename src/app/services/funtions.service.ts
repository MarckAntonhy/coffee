import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgInformationComponent } from '../components/msg-information/msg-information.component';

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
}
