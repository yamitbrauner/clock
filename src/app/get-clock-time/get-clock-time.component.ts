import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-get-clock-time',
  templateUrl: './get-clock-time.component.html',
  styleUrls: ['../app.component.css']
})
export class GetClockTimeComponent implements OnInit {

  constructor() { }
  @Input() clock: string;

  ngOnInit() {
  }

}
