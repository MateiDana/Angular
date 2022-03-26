import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transmission-log',
  templateUrl: './transmission-log.component.html',
  styleUrls: ['./transmission-log.component.css'],
})
export class TransmissionLogComponent {
  @Input()
  transmissionLogs: string[] | null = [];
}
