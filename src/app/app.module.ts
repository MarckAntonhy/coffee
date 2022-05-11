import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { PrecioBolsaComponent } from './home/precio-bolsa/precio-bolsa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MsgInformationComponent } from './components/msg-information/msg-information.component';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrecioBolsaComponent,
    MsgInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { 
      provide: MAT_DATE_LOCALE,
      useValue: 'es-PE'
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-PE'
    },
    { 
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, 
      useValue: { useUtc: true } 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
