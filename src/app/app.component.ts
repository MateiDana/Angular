import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  fromService: number = -Infinity;
  radioMessage: number = 0;

  subscriptions$: Subscription = new Subscription();
  // The cool way
  radioMessage$: Observable<number> = this.counterService.signal$.pipe(
    distinctUntilChanged(),
    tap((message: number) => (this.radioMessage = message))
  );

  manualRadioMessage$: Observable<number> =
    this.counterService.manualOverride$.pipe(
      distinctUntilChanged(),
      tap(console.log)
    );

  constructor(private counterService: CounterService) {
    this.fromService = this.counterService.valueFromService;

    // this.counterService.signal$.subscribe(console.log);
  }

  ngOnInit(): void {
    // The old way
    // this.subscriptions$.add(
    //   this.counterService.signal$.subscribe((message: number) => {
    //     this.radioMessage = message;
    //   })
    // );

    this.subscriptions$.add(this.radioMessage$.subscribe());
    this.subscriptions$.add(this.manualRadioMessage$.subscribe());
  }

  ngOnDestroy(): void {
    // aici facem clean-up
    this.subscriptions$.unsubscribe();
  }
}
