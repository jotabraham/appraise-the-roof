import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealtorService {

  realtorUrl:string = "https://realtor.p.rapidapi.com/properties/v2/list-for-sale";

  constructor(private http: HttpClient) { }

  getListing = (): any => {
    return this.http.get(this.realtorUrl, {
      headers: {
        'x-rapidapi-key': "e436efd178mshfd6fbe3966a4ab8p12d918jsn9b1bdf0e9910",
        'x-rapidapi-host': "realtor.p.rapidapi.com",
        useQueryString: "true",
      },
      params: {
        city: "Grand Rapids",
        limit: "100",
        offset: "0",
        state_code: "MI",
        sort: "relevance", 
      },
    })
  }
}
