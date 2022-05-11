import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FuntionsService } from 'src/app/services/funtions.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-precio-bolsa',
  templateUrl: './precio-bolsa.component.html',
  styleUrls: ['./precio-bolsa.component.css']
})
export class PrecioBolsaComponent implements OnInit {
  public form!: FormGroup;

  public displayedColumns: string[] = ['Certificacion', 'Diferencial'];
  public dataSource:any[] = [];
  

  constructor(
    private fb: FormBuilder,
    private sPrice: PriceService,
    private fn: FuntionsService,
    private spinner: NgxSpinnerService
  ) 
  { 
    this.createForm();
  }

  ngOnInit(): void {
    this.listar();
  }

  validar(parametro: string){
    return this.fn.invalid(parametro, this.form);
  }

  createForm(){
    let date = new Date();

    this.form = this.fb.group({
      fecha: [date, [Validators.required]],
      tCambio: ['', [Validators.required]],
      pBolsaNY: ['', [Validators.required]],
      pCoco: ['', [Validators.required]],
      pPilado: ['', [Validators.required]],
      pBolsaOrg: ['', [Validators.required]],
      pSegundas: ['', [Validators.required]],
      pZarandas: ['', [Validators.required]],
      pCisco: ['', [Validators.required]],
      editar: false,
      Detalle: []
    });
  }

  listar(){
    this.spinner.show();

    this.dataSource = [];
    
    let fecha = this.fn.fechaDB(this.form.value.fecha);

    console.log("Buscar", fecha);

    this.sPrice.list({fecha: fecha}).subscribe(response => {
      let precios = response.result.precios;
      
      let diferencial:any[] = response.result.diferencial;
      let list: any[] = [];

      diferencial.forEach(element => {
        list.push({
          Fecha: fecha,
          Codigo: element.codigo_Cer,
          Descripcion: element.nombre_Cer,
          Monto: element.diferencial_det
        })
      });

      this.dataSource = list;
      
      if(precios.length > 0){
        precios = precios[0];

        this.form.patchValue({
          tCambio: precios.tipoCam_PrB,
          pBolsaNY: precios.precioNY_PrB,
          pCoco: precios.precioCoco_PrB,
          pPilado: precios.precioPilado_PrB,
          pBolsaOrg: precios.importe_PrB,
          pSegundas: precios.importeSeg_PrB,
          pZarandas: precios.costoVariable_PrB,
          pCisco: precios.precioCisco_PrB,
          editar: true,
          Detalle: []
        });
      }
      else{
        this.form.patchValue({
          tCambio: '',
          pBolsaNY: '',
          pCoco: '',
          pPilado: '',
          pBolsaOrg: '',
          pSegundas: '',
          pZarandas: '',
          pCisco: '',
          editar: false,
          Detalle: []
        });
      }

      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.fn.mensajeError("Listar: "+error.message);
    });
  }

  async validarSave(){
    let data:any[] = this.dataSource;

    if(this.form.invalid) {
      this.fn.Empty_data(this.form);
      return false;
    }

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      
      console.log(element.Monto);
      
      if(this.fn.vacio(element.Monto)){

        this.fn.mensajeError("Verifique que este llenando los precios diferenciales");
        return false;
      }
    }

    return true;
  }

  async guardar(){
    let verificado = await this.validarSave();

    if(!verificado) return;

    this.spinner.show();

    let fecha = this.fn.fechaDB(this.form.value.fecha);

    console.log("guardar", fecha);
    
    let data = this.form.value;

    data.fecha = fecha;
    data.Detalle = this.dataSource;

    this.sPrice.save(data).subscribe(response => {
      console.log(response);
      if(response.success){
        this.fn.mensajeInformacion("Datos guardados");
      }
      else{
        this.fn.mensajeError(response.message);
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.fn.mensajeError("Guardar: "+error.message);
    });

    // console.log(data);
    // console.log(this.dataSource);
  }
}
