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

  public query;
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
  }

  switchModule(name){

    this.selectedButton = name;

    if(name == "ng-plan"){
      this.http.get('./assets/test-plan.json').subscribe(res => {
        this.data = res;
      })
    }

    if(name == "ng-mesh-viewer"){

      this._s.getRooms3D().subscribe(res => {
        this.data = res.data;
        this.query = res.query;
      }, err => console.log(err));

    }

  }

  roomClick(ev){
    this.selectedSpaces = [ev.uri];
  }

  log(ev){
    var uri = ev.uri;
    console.log(uri);

    this._s.getType(uri).subscribe(res => {
      if(res == "Space"){
        this._s.getAdjElements(uri).subscribe(res => {
          this.data = res.data;
          this.query = res.query;
        }, err => console.log(err));
      }else{
        this.switchModule("ng-mesh-viewer");
      }
    }, err => console.log(err));

    
  }

  canvasClick(){
    this.selectedSpaces = [];
  }

}