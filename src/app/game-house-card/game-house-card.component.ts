import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-house-card',
  templateUrl: './game-house-card.component.html',
  styleUrls: ['./game-house-card.component.css']
})
export class GameHouseCardComponent implements OnInit {

  @Input() gameCards: any;

  constructor() { }

  ngOnInit(): void {
  }

}
