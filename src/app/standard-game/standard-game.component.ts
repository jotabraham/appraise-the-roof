import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  houseRef: any;
  gameCards: any;
  city: string = '';
  state: string = '';
  slideChangeMessage = '';

  @Output() selectedCityState = new EventEmitter<Object>();

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.realtorService.clearTotalScore();
  }

  onLocationSubmit = (form: NgForm) => {
    this.realtorService.getFullArray(form).subscribe((response: any) => {
      this.fullArray = response.properties;
      this.fullArray = this.realtorService.shuffleGameArray(this.fullArray);
      // console.log(this.fullArray);
      this.realtorService.filterArray(this.fullArray);
      // this.realtorService.setGameArray(this.fullArray);
      this.gameArray = this.realtorService.setGameArray(this.fullArray);
      console.log('from game, game array', this.gameArray);
      console.log('from game, full array', this.fullArray);
      this.city = form.form.value.city;
      this.state = form.form.value.state;
      // console.log(this.city);
      // console.log(this.state);
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
    console.log('get and set favs game comp works');
  };

  log(event: number) {
    this.slideChangeMessage = `Slide has been switched: ${event}`;
  }
}
