import { Component, Input } from '@angular/core';
import { RadioSignature } from 'src/app/enums/radio-signature.enum';
import { CounterService } from 'src/app/services/counter.service';

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

  constructor(private counterService: CounterService) {}

  manualOverrideSignalValue(): void {
    this.counterService.manualOverride(RadioSignature.SECRET);
  }
}
