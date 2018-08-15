import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService ]
})
export class AppComponent implements OnInit {

  public data;
  public selectedSpaces;
  public buttons = ["ng-plan", "ng-mesh-viewer"];
  public selectedButton = "ng-plan";

  constructor(
    private http: HttpClient,
    private _s: AppService
  ) { }

  ngOnInit(){
    this.switchModule("ng-plan");

    this._s.getQuery('SELECT * WHERE {?s ?p ?o} LIMIT 10').subscribe(res => {
      // console.log(res);
    }, err => console.log(err));

  }

  switchModule(name){

    this.selectedButton = name;

    if(name == "ng-plan"){
      this.http.get('./assets/test-plan.json').subscribe(res => {
        this.data = res;
      })
    }

    if(name == "ng-mesh-viewer"){
      // this.http.get('./assets/test-mesh.json').subscribe(res => {
      //   this.data = res;
      // })

      this._s.getRooms3D().subscribe(res => {
        this.data = res;
      }, err => console.log(err));
    }

  }

  roomClick(ev){
    this.selectedSpaces = [ev.uri];
  }

  canvasClick(){
    this.selectedSpaces = [];
  }

}