import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FuntionsService } from '../services/funtions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public nameUser: string = '';
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sFn: FuntionsService
  ) { 
    let data = sFn.dataUser();
    this.nameUser = data.paterno +" " + data.nombres;
  }

  public showFiller: boolean = false;

  ngOnInit(): void {
    
  }

  singOut(){
    localStorage.removeItem("coffee");
    this.router.navigate(['']);
  }
}
