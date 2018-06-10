import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  features = ['clock', 'timer', 'setting'];
  editOptions = ['Hours', 'Minutes', 'Seconds'];
  currentEdit = 0;
  currentFeature = 0;
  firstAction = '';
  secondAction = '';
  start = false;
  timer = new Date();
  date = new Date();
  userCheck;
  clock = Observable.interval(1000)
    .map(() => {
      if (this.currentFeature === 1) {
        this.date.setSeconds(this.date.getSeconds() + 1);
        if (this.start) {
          return this.timer.setSeconds(this.timer.getSeconds() + 1);
        } else {
          return this.timer;
        }
      } else {
        return this.date.setSeconds(this.date.getSeconds() + 1);

      }
    });
  onUserEditTimeout() {
    this.date = new Date();
    this.onClickNext();
  }
  onClickNext() {
    clearTimeout(this.userCheck);
    this.start = false;
    if (this.currentFeature < this.features.length - 1) {
      this.currentFeature++;
    } else {
      this.currentFeature = 0;
    }
    switch (this.currentFeature) {
      case 0:
        this.firstAction = '';
        this.secondAction = '';
        break;
      case 1:
        this.firstAction = 'Start';
        this.secondAction = '';
        this.timer.setHours(0, 0, 0);
        break;
      case 2:
        this.firstAction = this.editOptions[this.currentEdit];
        this.secondAction = '+ 1';
        this.currentEdit = 0;
        this.userCheck = setTimeout(() => this.onUserEditTimeout(), 10000);
        break;
    }
  }

  onClickFirstAction() {
    clearTimeout(this.userCheck);
    switch (this.currentFeature) {
      case 1:
        this.start = !this.start;
        this.firstAction = (this.start) ? 'Stop' : 'Start';
        break;
      case 2:
        if (this.currentEdit < this.editOptions.length - 1) {
          this.currentEdit++;
        } else {
          this.currentEdit = 0;
        }
        this.firstAction = this.editOptions[this.currentEdit];
        this.userCheck = setTimeout(() => this.onUserEditTimeout(), 10000);
        break;
    }
  }

  onClickSecAction() {
    clearTimeout(this.userCheck);
    switch (this.currentFeature) {
      case 2:
        switch (this.currentEdit) {
          case 0:
            this.date = new Date(this.date.setHours(this.date.getHours() + 1));
            break;
          case 1:
            this.date = new Date(this.date.setMinutes(this.date.getMinutes() + 1));
            break;
          case 2:
            this.date = new Date(this.date.setSeconds(this.date.getSeconds() + 1));
            break;
      }
        this.userCheck = setTimeout(() => this.onUserEditTimeout(), 10000);
    }
  }
}
