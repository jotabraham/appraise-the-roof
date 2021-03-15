import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secret } from './secrets';

@Injectable({
  providedIn: 'root',
})
export class RealtorService {
  realtorUrl: string =
    'https://realtor.p.rapidapi.com/properties/v2/list-for-sale';
  apiKey: string = secret.api_key;
  apiHost: string = secret.api_host;

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
    let headers: any = {
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
      useQueryString: 'true',
    };
    let params: any = {
      city: form.value.city,
      limit: '100',
      offset: '0', 
      state_code: form.value.state,
      sort: 'relevance'
    }
    if (form.beds){
      params.beds_min = form.beds;
    }
    if (form.sqft){
      if(form.value.sqft === "0-500"){
          params.sqft_max = 500;
      } else if(form.value.sqft === "500-1000"){
          params.sqft_min = 500;
          params.sqft_max = 1000;
      } else if(form.value.sqft === "1000-1500"){
        params.sqft_min = 1000;
        params.sqft_max = 1500;
      } else if(form.value.sqft === "1500-2000"){
        params.sqft_min = 1500;
        params.sqft_max = 2000;
      } else {
        params.sqft_min = 2000;
      }
    }
    return this.http.get(this.realtorUrl, {
      headers: headers,
      params: params
    })
  };
}
