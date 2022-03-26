import { Component } from '@angular/core';
import { Observable, tap, map, filter } from 'rxjs';
import { RadioSignature } from 'src/app/enums/radio-signature.enum';
import { RadioSignal } from 'src/app/interfaces/radio-signal.interface';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-alien-counter',
  templateUrl: './alien-counter.component.html',
  styleUrls: ['./alien-counter.component.css'],
})
export class AlienCounterComponent {
  fromService: number = -Infinity;
  signalValueFromEarth: number = -Infinity;

  // TODO: add subscriptions

  earthSignal$: Observable<number> = this.counterService.signal$.pipe(
    map((signal: RadioSignal) => signal.value),
    filter((value: number) => value % 3 === 0), // let's assume aliens could not decode all frequencies
    tap((message: number) => (this.signalValueFromEarth = message))
  );

  constructor(private counterService: CounterService) {
    this.fromService = this.counterService.valueFromService;
    this.earthSignal$.subscribe();
  }

  emitElectroMagneticPulse(): void {
    this.counterService.manualOverride(RadioSignature.ALIEN);
    this.counterService.electromagneticPulse$.next();
    this.counterService.electromagneticPulse$.complete();
  }
}
