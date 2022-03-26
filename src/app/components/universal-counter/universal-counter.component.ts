import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-universal-counter',
  templateUrl: './universal-counter.component.html',
  styleUrls: ['./universal-counter.component.css'],
})
export class UniversalCounterComponent {
  @Input()
  counterValue: number = -Infinity; // | 0

  @Input()
  fromService: number = -Infinity;
}
