import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  merge,
  Observable,
  Subject,
  tap,
} from 'rxjs';

// Observable data stream

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  valueFromService: number = 42;
  overrideValuesLog: number[] = [];

  manualOverride$: Subject<number> = new Subject<number>();
  private signalValue$: BehaviorSubject<number> = new BehaviorSubject(0);

  // signal$: Observable<number> = interval(1000);
  // compozitie de stream-uri
  signal$: Observable<number> = merge(
    this.signalValue$.asObservable(),
    this.manualOverride$.asObservable()
  );

  constructor() {
    this.startTransmission();
  }

  manualOverride(): void {
    const overrideValue = this.getRandomSignalValue();

    this.overrideValuesLog.push(overrideValue);
    this.manualOverride$.next(overrideValue);
    this.signalValue$.next(overrideValue);
  }

  private startTransmission(): void {
    interval(1000)
      .pipe(
        tap(() => {
          let currentSignalValue = this.signalValue$.getValue();

          this.signalValue$.next(++currentSignalValue);
        })
      )
      .subscribe();
  }

  private getRandomSignalValue(): number {
    return Math.floor(Math.random() * this.valueFromService);
  }
}
