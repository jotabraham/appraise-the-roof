import { Component, OnInit } from '@angular/core';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];
  favorited: boolean = true;
  searchTerms: any = {
    searchCityTerm: "",
    searchStateTerm: "",
    searchMinPriceTerm: "",
  }

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void {
    this.favorites = this.realtorService.getFavorites();
  }

  getAndSetFavorites = (favorite: any) => {
    this.realtorService.toggleFavorites(favorite);
    this.favorites = this.realtorService.getFavorites();
  };

  filterFavorites = (searchTermsObject: any) => {
    let filteredArray = this.favorites;
    if (searchTermsObject.searchCityTerm) {
      filteredArray = filteredArray.filter((item) => {
        return item.address.city.toLowerCase().trim().includes(searchTermsObject.searchCityTerm.toLowerCase().trim())
      })
    }
    if (searchTermsObject.searchStateTerm) {
      filteredArray = filteredArray.filter((item) => {
        return item.address.state_code === searchTermsObject.searchStateTerm;
      })
    }
    if (searchTermsObject.searchMinPriceTerm >= 0 && searchTermsObject.searchMinPriceTerm !== "") {
      if (searchTermsObject.searchMinPriceTerm !== "500000" && searchTermsObject.searchMinPriceTerm !== "") {
        filteredArray = filteredArray.filter((item) => {
          return item.price >= searchTermsObject.searchMinPriceTerm && item.price <= parseInt(searchTermsObject.searchMinPriceTerm) + 50000;
        })
      } else {
        filteredArray = filteredArray.filter((item) => {
          return parseInt(item.price) >= 500000;
        })
      }
    }
    return filteredArray;
  }
}