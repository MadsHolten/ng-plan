import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data;
  public selectedSpaces;
  public buttons = ["ng-plan", "ng-mesh-viewer"];
  public selectedButton = "ng-plan";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(){
    this.switchModule("ng-plan");
  }

  switchModule(name){

    this.selectedButton = name;

    if(name == "ng-plan"){
      this.http.get('./assets/test-plan.json').subscribe(res => {
        this.data = res;
      })
    }

    if(name == "ng-mesh-viewer"){
      this.http.get('./assets/test-mesh.json').subscribe(res => {
        this.data = res;
      })
    }

  }

  roomClick(ev){
    this.selectedSpaces = [ev.uri];
  }

  canvasClick(){
    this.selectedSpaces = [];
  }

}