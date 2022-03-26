import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  merge,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { RadioSignature } from '../enums/radio-signature.enum';
import { RadioSignal } from '../interfaces/radio-signal.interface';
import { LoggingService } from './logging.service';

// Observable data stream

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  readonly initialRadioSignal: RadioSignal = {
    value: 0,
    signature: RadioSignature.SECRET,
  };

  valueFromService: number = 42;
  overrideValuesLog: number[] = [];

  electromagneticPulse$: Subject<void> = new Subject<void>();

  manualOverride$: Subject<RadioSignal> = new Subject<RadioSignal>();
  private signalValue$: BehaviorSubject<RadioSignal> = new BehaviorSubject(
    this.initialRadioSignal
  );

  // signal$: Observable<number> = interval(1000);
  // compozitie de stream-uri
  signal$: Observable<RadioSignal> = merge(
    this.signalValue$.asObservable(),
    this.manualOverride$.asObservable()
  ).pipe(takeUntil(this.electromagneticPulse$));

  constructor(private loggingService: LoggingService) {
    this.startTransmission();
  }

  // make signature param optional for suckers who try to jam the transmission
  manualOverride(signature: RadioSignature = RadioSignature.EXTERNAL): void {
    const overrideSignal = this.getRandomSignalValue(signature);

    if (
      signature !== RadioSignature.SECRET &&
      !this.electromagneticPulse$.isStopped
    ) {
      const logMessage = `Intercepted transmission jam with value: ${overrideSignal.value} and signature: ${signature}`;
      console.log(this.electromagneticPulse$);
      this.overrideValuesLog.push(overrideSignal.value);
      this.loggingService.log(logMessage);
      return;
    }

    this.overrideValuesLog.push(overrideSignal.value);
    this.manualOverride$.next(overrideSignal);
    this.signalValue$.next(overrideSignal);
  }

  private startTransmission(): void {
    interval(1000)
      .pipe(
        tap(() => {
          let currentSignal = this.signalValue$.getValue();

          this.signalValue$.next({
            ...currentSignal,
            value: ++currentSignal.value,
          });
        })
      )
      .subscribe();
  }

  private getRandomSignalValue(
    signature: RadioSignature = RadioSignature.EXTERNAL
  ): RadioSignal {
    return {
      value: Math.floor(Math.random() * this.valueFromService),
      signature,
    };
  }
}
