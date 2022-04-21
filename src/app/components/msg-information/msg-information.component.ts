import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-information',
  templateUrl: './msg-information.component.html',
  styleUrls: ['./msg-information.component.css']
})
export class MsgInformationComponent implements OnInit {
  img: string = '';

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public body: any,
    public dialog: MatDialogRef<MsgInformationComponent>
  ) { 
    let ruta = "assets/img/svg/";
    this.img = ruta + (body.tipo == "error" ? "alerta.svg" : "exito.svg");
  }

  ngOnInit(): void {
  }

  confirmado(){
    this.dialog.close(true);
  }
}
