import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {

  public year : number;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
