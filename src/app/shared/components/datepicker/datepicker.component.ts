import { Component, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() model1: string;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit() {
  }

}
