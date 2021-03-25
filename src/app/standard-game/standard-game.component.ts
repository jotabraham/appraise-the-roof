import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HighScore } from '../interfaces/high-score';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-standard-game',
  templateUrl: './standard-game.component.html',
  styleUrls: ['./standard-game.component.css'],
})
export class StandardGameComponent implements OnInit {
  gameArray: any[] = [];
  fullArray: any[] = [];
  city: string = '';
  state: string = '';
  slideChangeMessage = '';
  showSqFt: number[] = [];
  showBeds: number[] = [];
  showBaths: number[] = [];
  guesswithCommasAndDollarSign: string = '';
  score: number = 0;
  userGuess: number = 0;
  newPointsAwarded: number = 0;
  locationSelected: boolean = false;
  appraised: number[] = [];
  favorites: any[] = [];
  currentSlideArray: any[] = [];
  currentIndex: number = 0;
  gameFinished: boolean = false;
  open: boolean = true;

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.realtorService.clearTotalScore();
    this.favorites = this.realtorService.getFavorites();
  }

  nextIndex = () => {
    this.currentIndex++;
  };

  onGuess = (form: NgForm, index: number): void => {
    this.userGuess = form.form.value.guess;
    if (!this.appraised.includes(index)) {
      this.appraised.push(index);
      let price: number = this.gameArray[index].price;
      let difference: number = Math.abs(price - this.userGuess);
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
      this.guesswithCommasAndDollarSign = '';
      form.reset();
      if (this.appraised.length === this.gameArray.length) {
        this.submitHighScore();
        this.gameFinished = true;
      }
    }
  };

  onLocationSubmit = (form: NgForm) => {
    this.realtorService.getFullArray(form).subscribe((response: any) => {
      this.fullArray = response.properties;
      this.fullArray = this.realtorService.shuffleGameArray(this.fullArray);
      this.gameArray = this.realtorService.setGameArray(this.fullArray);
      this.city = form.form.value.city;
      this.state = form.form.value.state;
      this.locationSelected = !this.locationSelected;
    });
  };

  submitHighScore = () => {
    let highScoreObject: HighScore = {
      city: this.city,
      state: this.state,
      highScore: this.realtorService.getTotalScore(),
    };
    this.realtorService.updateHighScoreArray(highScoreObject);
  };

  getAndSetFavorites = (favorite: any) => {
    this.realtorService.toggleFavorites(favorite);
  };

  log(event: number) {
    this.slideChangeMessage = `Slide has been switched: ${event}`;
  }

  revealSqFtHint = (index: number): void => {
    this.showSqFt.push(index);
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };

  revealBedsHint = (index: number): void => {
    this.showBeds.push(index);
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };

  revealBathsHint = (index: number): void => {
    this.showBaths.push(index);
    this.realtorService.deductHintPoints();
    this.score = this.realtorService.getTotalScore();
  };

  checkIndexGuessedSqft = (index: number): boolean => {
    return this.showSqFt.includes(index);
  };
  checkIndexGuessedBeds = (index: number): boolean => {
    return this.showBeds.includes(index);
  };
  checkIndexGuessedBaths = (index: number): boolean => {
    return this.showBaths.includes(index);
  };
  checkIndexAppraised = (index: number): boolean => {
    return this.appraised.includes(index);
  };

  onFavorite = (favorite: any): void => {
    this.realtorService.toggleFavorites(favorite);
    this.favorites = this.realtorService.getFavorites();
  };

  checkFavs = (house: any): boolean => {
    return this.realtorService.favorites.some((item) => {
      return item.property_id === house.property_id;
    });
  };

  addCommas = (form: NgForm) => {
    if (form.form.value.guess !== null) {
      this.guesswithCommasAndDollarSign = form.form.value.guess.toLocaleString();
      this.guesswithCommasAndDollarSign.replace(/\D/g, ''), 10;
      this.guesswithCommasAndDollarSign = `$${this.guesswithCommasAndDollarSign}`;
    } else {
      this.guesswithCommasAndDollarSign = null;
    }
  };

  closeWindow = () => {
    this.open = !this.open;
  };
}
