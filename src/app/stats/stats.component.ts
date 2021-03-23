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

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void {

    this.highScoreArray = this.realtorService.getHighScoresArray();
    // this.highScoreArray = this.realtorService.sortHighScoreArray(this.highScoreArray);
  }
}
