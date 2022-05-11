import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuntionsService } from './funtions.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(
    private http: HttpClient,
    private fn: FuntionsService
  ) { }

  list(body: any): Observable<any>{
    let token = "bearer "+this.fn.dataUser().token;
    let headers = new HttpHeaders().set("Authorization", token);

    return this.http.post(environment.urlApi+"/api/transaccion/listarprecio", body, {headers: headers});
  }

  save(body: any): Observable<any>{
    let token = "bearer "+this.fn.dataUser().token;
    let headers = new HttpHeaders().set("Authorization", token);

    console.log(body);

    return this.http.post(environment.urlApi+"/api/transaccion/guardarprecio", body, {headers: headers});
  }
}
