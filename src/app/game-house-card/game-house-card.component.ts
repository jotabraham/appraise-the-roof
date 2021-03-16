import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-game-house-card',
  templateUrl: './game-house-card.component.html',
  styleUrls: ['./game-house-card.component.css']
})
export class GameHouseCardComponent implements OnInit {
  totalScore:number = 0;

  @Input() gameCards: any;

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void {
  }

  onGuess = (form: NgForm):number => {
    let guess:number = form.form.value.guess;
    let price:number = this.gameCards.price;
    let number:number = Math.abs(price - guess);
    let pointsAwarded:number = 0;
      if (number === 0) {
         pointsAwarded = 100;
      } else if (number <= 1000) {
         pointsAwarded = 80;
      } else if (number > 1000 && number <=10000) {
         pointsAwarded = 60;
      } else if (number > 10000 && number <= 50000) {
         pointsAwarded = 40;
      } else if (number > 50000 && number <=100000) {
         pointsAwarded = 20;
      } else {
         pointsAwarded = 5;
      }
      console.log("total score", this.totalScore);
      console.log("guess", guess);
      console.log("price", price);
      console.log("number", number);      
      console.log(`Therefore they were awarded ${pointsAwarded} points`);
      return this.totalScore += pointsAwarded;
  }



}
