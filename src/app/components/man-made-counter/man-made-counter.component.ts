import { Component, Input, OnInit } from '@angular/core';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-man-made-counter',
  templateUrl: './man-made-counter.component.html',
  styleUrls: ['./man-made-counter.component.css'],
})
export class ManMadeCounterComponent implements OnInit {
  @Input()
  fromService: number = -Infinity;

  jamTransmissionValue: number = -Infinity;

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {}

  jamTransmission(): void {
    this.counterService.manualOverride();
    this.jamTransmissionValue =
      this.counterService.overrideValuesLog[
        this.counterService.overrideValuesLog.length - 1
      ];
  }
}
