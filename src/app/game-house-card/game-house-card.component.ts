import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-game-house-card',
  templateUrl: './game-house-card.component.html',
  styleUrls: ['./game-house-card.component.css'],
})
export class GameHouseCardComponent implements OnInit {
  @Input() gameCards: any;
  newPointsAwarded: number = 0;
  score: number = 0;
  showSqFt: boolean = false;
  showBeds: boolean = false;
  showBaths: boolean = false;

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {}

  onGuess = (form: NgForm): void => {
    let guess: number = form.form.value.guess;
    let price: number = this.gameCards.price;
    let difference: number = Math.abs(price - guess);
    let pointsAwarded: number = 0;
    if (difference === 0) {
      pointsAwarded = 100;
    } else if (difference <= 1000) {
      pointsAwarded = 80;
    } else if (difference > 1000 && difference <= 10000) {
      pointsAwarded = 60;
    } else if (difference > 10000 && difference <= 50000) {
      pointsAwarded = 40;
    } else if (difference > 50000 && difference <= 100000) {
      pointsAwarded = 20;
    } else {
      pointsAwarded = 5;
    }

    console.log('guess', guess);
    console.log('price', price);
    console.log('difference', difference);
    console.log(`Therefore they were awarded ${pointsAwarded} points`);
    this.realtorService.updateTotalScore(pointsAwarded);
    let currentTotal = this.realtorService.getTotalScore();
    console.log('total score', currentTotal);
    this.score = currentTotal;
    this.newPointsAwarded = pointsAwarded;
  };

  revealSqFtHint = ():void => {
    if(this.showSqFt === false){
      this.showSqFt = true;
    }
    this.realtorService.deductHintPoints();
  }
  revealBedsHint = ():void => {
    if(this.showBeds === false){
      this.showBeds = true;
    }
    this.realtorService.deductHintPoints();
  }
  revealBathsHint = ():void => {
    if(this.showBaths === false){
      this.showBaths = true;
    }
    this.realtorService.deductHintPoints();
  }


  //   addComma = (value) => {
  //     let guess = parseInt(value.replace(/\D/g, ''), 10);
  //     value = guess.toLocaleString();
  //   };
}
