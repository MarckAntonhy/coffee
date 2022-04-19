import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PrecioBolsaComponent } from "./home/precio-bolsa/precio-bolsa.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, children: [
        {path: 'preciobolsa', component: PrecioBolsaComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true,
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})

export class AppRoutingModule {}