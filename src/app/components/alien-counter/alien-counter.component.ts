import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-alien-counter',
  templateUrl: './alien-counter.component.html',
  styleUrls: ['./alien-counter.component.css'],
})
export class AlienCounterComponent implements OnInit {
  fromService: number = -Infinity;
  signalValueFromEarth: number = -Infinity;

  // TODO: add subscriptions

  earthSignal$: Observable<number> = this.counterService.manualOverride$.pipe(
    tap((message: number) => (this.signalValueFromEarth = message))
  );

  constructor(private counterService: CounterService) {
    this.fromService = this.counterService.valueFromService;
    this.earthSignal$.subscribe();
  }

  ngOnInit(): void {}
}
