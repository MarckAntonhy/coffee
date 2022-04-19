import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-precio-bolsa',
  templateUrl: './precio-bolsa.component.html',
  styleUrls: ['./precio-bolsa.component.css']
})
export class PrecioBolsaComponent implements OnInit {
  public form!: FormGroup;
  public displayedColumns: string[] = ['Certificacion', 'Diferencial'];
  public dataSource = [
    {Certificacion: 'CONVENCIONAL', Diferencial: '0.00'},
    {Certificacion: 'ORGANICO', Diferencial: '2.5'},
    {Certificacion: 'RAINFOREST ALIANCE', Diferencial: '2.5'}
  ];
  

  constructor() { }

  ngOnInit(): void {
  }

}
