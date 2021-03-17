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

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.highScoreArray = this.realtorService.getHighScoresArray();
    console.log(this.highScoreArray);
    console.log('Stats page initiation');
  }

  // getAndSetScoreBoard = (objOfHighScore: HighScore):any => {
  //   // this.highScoreStat = this.realtorService.updateHighScoreArray(objOfHighScore);
  // }
}
