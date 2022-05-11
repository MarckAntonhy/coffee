import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FuntionsService } from '../services/funtions.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private sUser: UserService,
    private fb: FormBuilder,
    private router: Router,
    private sFn: FuntionsService,
    private spinner: NgxSpinnerService
  ) { 

    if(sFn.dataUser() != null){
      this.router.navigate(['home/preciobolsa'])
    }

    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]]
    });
  }

  validar(parametro: string){
    return this.sFn.invalid(parametro, this.form);
  }

  login(){
    if(this.form.invalid){
      return this.sFn.Empty_data(this.form);
    }

    this.spinner.show();

    this.sUser.login(this.form.value).subscribe(response => {
      if(!response.success){
        this.spinner.hide();
        this.sFn.mensajeError("Error al iniciar sesión: "+response.message);
        return;
      }

      localStorage.setItem('coffee', JSON.stringify(response.result));
      this.spinner.hide();

      this.router.navigate(['home/preciobolsa']);
    }, (error) => {
      this.spinner.hide();
      this.sFn.mensajeError("Login: "+error.message);
    });
  }
}
