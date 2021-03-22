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
  @Input() favoritesRef!: any[];
  @Output() favoritesEvent = new EventEmitter<any>();

  newPointsAwarded: number = 0;
  score: number = 0;
  showSqFt: boolean = false;
  showBeds: boolean = false;
  showBaths: boolean = false;
  appraised: boolean = false;
  userGuess: number = 0;
  numberWithCommas: string = null;

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void { }

  onGuess = (form: NgForm): void => {
    let guess: number = form.form.value.guess;
    this.userGuess = guess;
    let price: number = this.gameCards.price;
    let difference: number = Math.abs(price - guess);
    let pointsAwarded: number = 0;
    if (difference === 0) {
      pointsAwarded = 1000;
    } else if (difference <= 1000) {
      pointsAwarded = 100;
    } else if (difference > 1000 && difference <= 10000) {
      pointsAwarded = 75;
    } else if (difference > 10000 && difference <= 50000) {
      pointsAwarded = 50;
    } else if (difference > 50000 && difference <= 100000) {
      pointsAwarded = 25;
    } else {
      pointsAwarded = 0;
    }

    this.realtorService.updateTotalScore(pointsAwarded);
    let currentTotal = this.realtorService.getTotalScore();
    this.score = currentTotal;
    this.newPointsAwarded = pointsAwarded;
  };

  revealSqFtHint = (): void => {
    if (this.showSqFt === false) {
      this.showSqFt = true;
    }
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };
  revealBedsHint = (): void => {
    if (this.showBeds === false) {
      this.showBeds = true;
    }
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };
  revealBathsHint = (): void => {
    if (this.showBaths === false) {
      this.showBaths = true;
    }
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };

  emitFavoritesEvent = (favorite: any): void => {
    this.favoritesEvent.emit(favorite);
    console.log("game card favorite works");

  };

  checkFavs = (house: any): boolean => {
    return this.realtorService.favorites.some((item) => {
      return item.property_id === house.property_id;
    })
  }

  addCommas = (form: NgForm) => {
    // console.log(form.form.value.guess);
    if (form.form.value.guess !== null) {
      this.numberWithCommas = form.form.value.guess.toLocaleString();
      this.numberWithCommas.replace(/\D/g, ''), 10;
      console.log(this.numberWithCommas);
    } else {
      this.numberWithCommas = null;
    }

  }

}
