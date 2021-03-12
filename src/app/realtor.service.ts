import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secret } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class RealtorService {

  realtorUrl:string = "https://realtor.p.rapidapi.com/properties/v2/list-for-sale";
  apiKey:string = secret.api_key;
  apiHost:string = secret.api_host;

  constructor(private http: HttpClient) { }

  // getListing = (): any => {
  //   return this.http.get(this.realtorUrl, {
  //     headers: {
  //       'x-rapidapi-key': this.apiKey,
  //       'x-rapidapi-host': this.apiHost,
  //       useQueryString: "true",
  //     },
  //     params: {
  //       city: "Grand Rapids",
  //       limit: "100",
  //       offset: "0",
  //       state_code: "MI",
  //       sort: "relevance", 
  //     },
  //   })
  // }
}
