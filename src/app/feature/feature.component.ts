import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  @Input() feature: string;
  @Input() firstAction: string;
  @Input() secondAction: string;
  @Output() clickFirstAction = new EventEmitter<number>();
  @Output() clickSecAction = new EventEmitter<number>();

  constructor() { }
  clickActionOne() {
    this.clickFirstAction.emit();
  }
  clickActionTwo() {
    this.clickSecAction.emit();
  }
}
