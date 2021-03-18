import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HighScore } from './interfaces/high-score';
import { secret } from './secrets';

@Injectable({
  providedIn: 'root',
})
export class RealtorService {
  realtorUrl: string =
    'https://realtor.p.rapidapi.com/properties/v2/list-for-sale';
  apiKey: string = secret.api_key;
  apiHost: string = secret.api_host;
  fullArray: any[] = [];
  totalScore: number = 0;
  highScoreArray: HighScore[] = [
    {
    city: "Grand Rapids",
    state: "MI",
    highScore: 1000,
    },
    {
    city: "Grand Rapids",
    state: "MI",
    highScore: 850,
    },
    {
    city: "Grand Rapids",
    state: "MI",
    highScore: 550,
    },
    {
    city: "Grand Rapids",
    state: "MI",
    highScore: 100,
    },
  ];
  selectedCityState: any;

  constructor(private http: HttpClient) {}

  getListing = (): any => {
    return this.http.get(this.realtorUrl, {
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost,
        useQueryString: 'true',
      },
      params: {
        city: 'Grand Rapids',
        limit: '100',
        offset: '0',
        state_code: 'MI',
        sort: 'relevance',
      },
    });
  };

  searchListings = (form: any): any => {
    console.log(form);

    let headers: any = {
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
      useQueryString: 'true',
    };
    let params: any = {
      city: form.form.value.city,
      limit: '100',
      offset: '0',
      state_code: form.form.value.state,
      sort: 'relevance',
      prop_type: 'single_family',
    };
    if (form.form.value.beds) {
      params.beds_min = form.form.value.beds;
    }
    if (form.sqft) {
      if (form.form.value.sqft === '0-500') {
        params.sqft_max = 500;
      } else if (form.form.value.sqft === '500-1000') {
        params.sqft_min = 500;
        params.sqft_max = 1000;
      } else if (form.form.value.sqft === '1000-1500') {
        params.sqft_min = 1000;
        params.sqft_max = 1500;
      } else if (form.form.value.sqft === '1500-2000') {
        params.sqft_min = 1500;
        params.sqft_max = 2000;
      } else {
        params.sqft_min = 2000;
      }
    }
    return this.http.get(this.realtorUrl, {
      headers: headers,
      params: params,
    });
  };

  getFullArray = (form: NgForm) => {
    console.log(form);

    let headers: any = {
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
      useQueryString: 'true',
    };
    let params: any = {
      city: form.form.value.city,
      limit: '100',
      offset: '0',
      state_code: form.form.value.state,
      sort: 'relevance',
      prop_type: 'single_family',
      // sqft_min: '0',
    };

    return this.http.get(this.realtorUrl, {
      headers: headers,
      params: params,
    });
  };

  shuffleGameArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  updateTotalScore = (score: number) => {
    this.totalScore += score;
  };

  getTotalScore = () => {
    return this.totalScore;
  };

  updateHighScoreArray = (highScoreObject: HighScore) => {
    this.highScoreArray.push(highScoreObject);
    console.log(this.highScoreArray);
  };

  clearTotalScore = () => {
    this.totalScore = 0;
  };

  getHighScoresArray = () => {
    return this.highScoreArray;
  };

  deductHintPoints = () => {
    this.totalScore -= 25;
  };
}
