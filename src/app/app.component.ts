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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(){
    this.http.get('./assets/test-data.json').subscribe(res => {
      this.data = res;
    })
  }

}