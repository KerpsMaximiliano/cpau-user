import { Component, OnInit } from '@angular/core';
import { Resumen } from './models/resumen.model';
import { ResumenService } from './service/resumen.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  collapsed: boolean;
  public resumen: Resumen;
  public urlHelp = 'https://www.cpau.org/nota/34664';

  constructor(private resumenService: ResumenService) {}

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.resumenService.getAll()
    .subscribe(d => {
      this.resumen = d;
  });
  }
  reload() {
    this.initData();
  }
}

