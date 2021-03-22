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
      this.filterArray(this.fullArray);
      this.setGameArray(this.gameArray);
      this.city = form.form.value.city;
      this.state = form.form.value.state;
      // console.log(this.city);
      // console.log(this.state);
    });
  };

  filterArray = (fullArrayOfHouses: any[]): void => {
    this.gameArray = fullArrayOfHouses.filter((item) => {
      return (
        item.hasOwnProperty("thumbnail") &&
        item.hasOwnProperty("price") &&
        item.hasOwnProperty("beds") &&
        item.hasOwnProperty("baths") &&
        item.hasOwnProperty("building_size") &&
        item.hasOwnProperty("lot_size") &&
        item.hasOwnProperty("address")
      );
    });
    // console.log("filtered?", this.gameArray);
  };

  setGameArray = (fullArrayOfHouses: any[]): void => {
    this.gameArray = fullArrayOfHouses.slice(0, 10);
    console.log(this.gameArray);
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
    console.log("get and set favs game comp works");
    
  };
}
