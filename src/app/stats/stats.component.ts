import { Component, OnInit } from '@angular/core';
import { HighScore } from '../interfaces/high-score';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  highScoreArray: HighScore[] = [];
  kerryPopup: boolean = false;
  johnPopup: boolean = false;
  andreaPopup: boolean = false;

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void {

    this.highScoreArray = this.realtorService.getHighScoresArray();
  }

  showKerryPopup = (): void => {
    this.kerryPopup = !this.kerryPopup;
  };
  showJohnPopup = (): void => {
    this.johnPopup = !this.johnPopup;
  };
  showAndreaPopup = (): void => {
    this.andreaPopup = !this.andreaPopup;
  };
}
