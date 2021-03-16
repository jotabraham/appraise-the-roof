import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-standard-game',
  templateUrl: './standard-game.component.html',
  styleUrls: ['./standard-game.component.css'],
})
export class StandardGameComponent implements OnInit {
  gameArray: any[] = [];
  fullArray: any[] = [];
  gameCards: any;
  // @Output() userInputEvent = new EventEmitter<NgForm>();

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {}

  onLocationSubmit = (form: NgForm) => {
    this.realtorService.getFullArray(form).subscribe((response: any) => {
      this.fullArray = response.properties;
      this.fullArray = this.shuffleGameArray(this.fullArray);
      this.setGameArray(this.fullArray);
    });
  };

  shuffleGameArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  setGameArray = (fullArrayOfHouses: any[]):void => {
    this.gameArray = fullArrayOfHouses.slice(0, 10);
    console.log(this.gameArray);
  }
}
