import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  history: string[] = [];

  historyStream$: Subject<string[]> = new Subject<string[]>();

  get log$(): Observable<string[]> {
    return this.historyStream$.asObservable();
  }

  log(message: string): void {
    this.history.push(message);
    this.historyStream$.next(this.history);
  }
}
