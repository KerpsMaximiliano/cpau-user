import { Component, OnInit } from '@angular/core';

declare function triggerCarousel() : any ;

@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    triggerCarousel();
  }

}
