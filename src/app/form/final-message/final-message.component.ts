import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-message',
  templateUrl: './final-message.component.html',
  styleUrls: ['./final-message.component.css']
})
export class FinalMessageComponent implements OnInit {

  finalMessage: string;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.finalMessage = this.router.getCurrentNavigation().extras.state.finalMessage;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
