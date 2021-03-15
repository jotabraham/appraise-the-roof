import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css'],
})
export class HouseCardComponent implements OnInit {
  @Input() houseRef: any;

  constructor() {}

  ngOnInit(): void {}
}
