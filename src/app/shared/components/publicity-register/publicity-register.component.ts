import { Component, OnInit } from '@angular/core';

declare function triggerCarousel() : any ;

@Component({
  selector: 'app-publicity-register',
  templateUrl: './publicity-register.component.html',
  styleUrls: ['./publicity-register.component.css']
})
export class PublicityRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    triggerCarousel();
  }

}
