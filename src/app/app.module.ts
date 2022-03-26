import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UniversalCounterComponent } from './components/universal-counter/universal-counter.component';
import { AlienCounterComponent } from './components/alien-counter/alien-counter.component';
import { ManMadeCounterComponent } from './components/man-made-counter/man-made-counter.component';

@NgModule({
  declarations: [AppComponent, UniversalCounterComponent, AlienCounterComponent, ManMadeCounterComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
