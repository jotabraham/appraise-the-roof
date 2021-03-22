import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    console.log("favs array: " + this.favorites);
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


  // setSearchCityTerm = (form: NgForm):void => {
  //   this.searchCityTerm = form.form.value.searchCity;
  //   console.log("form (city)", form);
  //   console.log("city", this.searchCityTerm);

  // };

  // setSearchStateTerm = (form: NgForm):void => {
  //   this.searchStateTerm = form.form.value.state;
  //   console.log("form (state)", form); 
  //   console.log("state", this.searchStateTerm);
  // };

  // setSearchPriceTerm = (form: NgForm):void => {
  //   // this.searchPriceRangeTerm = parseInt(form.form.value.priceRange);
  //   if(form.form.value.priceRange === "0"){
  //     this.searchMinPrice = null;
  //     this.searchMaxPrice = null;
  //   } else if(form.form.value.priceRange === "0-50000"){
  //     this.searchMinPrice = 0;
  //     this.searchMaxPrice = 50000;
  //   } else if(form.form.value.priceRange === "50000-100000"){
  //     this.searchMinPrice = 50000;
  //     this.searchMaxPrice = 100000;
  //   } else if(form.form.value.priceRange === "100000-150000"){
  //     this.searchMinPrice = 100000;
  //     this.searchMaxPrice = 150000;
  //   } else if(form.form.value.priceRange === "150000-200000"){
  //     this.searchMinPrice = 150000;
  //     this.searchMaxPrice = 200000;
  //   } else if(form.form.value.priceRange === "200000-250000"){
  //     this.searchMinPrice = 200000;
  //     this.searchMaxPrice = 250000;
  //   } else if(form.form.value.priceRange === "250000-300000"){
  //     this.searchMinPrice = 250000;
  //     this.searchMaxPrice = 300000;
  //   } else if(form.form.value.priceRange === "300000-350000"){
  //     this.searchMinPrice = 300000;
  //     this.searchMaxPrice = 350000;
  //   } else if(form.form.value.priceRange === "350000-400000"){
  //     this.searchMinPrice = 350000;
  //     this.searchMaxPrice = 400000;
  //   }else if(form.form.value.priceRange === "400000-450000"){
  //     this.searchMinPrice = 400000;
  //     this.searchMaxPrice = 450000;
  //   } else if(form.form.value.priceRange === "450000-500000"){
  //     this.searchMinPrice = 450000;
  //     this.searchMaxPrice = 500000;
  //   }else {
  //     this.searchMinPrice = 500000;
  //     this.searchMaxPrice = 9999999999999999;
  //   }
  //   console.log("form (price)", form);
  //   console.log("price", this.searchMinPrice, this.searchMaxPrice);
  // }

  // setSearchTerms = (form: NgForm):void => {
  //     console.log(form.form.value);

  // }




  // filterFavorites = (city:string, state:string, min: number, max: number):any[] => {
  //   if (city === "" && state ==="" && min === null) {
  //     return this.favorites;
  //   } else if (city !== "" && state ==="" && min === null){
  //     return this.favorites.filter((item) => {
  //       // console.log("favs, just city", this.favorites);
  //       return item.address.city.toLowerCase().trim().includes(city.toLowerCase().trim());
  //     })
  //   } else if (city === "" && state !=="" && min === null){
  //     return this.favorites.filter((item) => {
  //       // console.log("favs, just state", this.favorites);
  //       return item.address.state_code === state;
  //     })
  //   } else if (city !== "" && state !=="" && min === null){
  //     return this.favorites.filter((item) => {
  //       // console.log("favs, just city and state", this.favorites);
  //       return item.address.city.toLowerCase().trim().includes(city.toLowerCase().trim()) && item.address.state_code === state;
  //     })
  //   } else if (city === "" && state ==="" && min !== null){
  //     return this.favorites.filter((item) => {
  //       // console.log("favs, just price", this.favorites);
  //       return item.price >= this.searchMinPrice && item.price <= this.searchMaxPrice;
  //     })
  //   }  else if (city !== "" && state ==="" && min !== null){
  //     return this.favorites.filter((item) => {
  //       // console.log("favs, just city and price", this.favorites);
  //       return item.price >= this.searchMinPrice && item.price <= this.searchMaxPrice && item.address.city.toLowerCase().trim().includes(city.toLowerCase().trim());
  //     })
  //   }  else if (city === "" && state !=="" && min !== null){
  //     return this.favorites.filter((item) => {
  //       // console.log("just price and state", this.favorites);
  //       return item.price >= this.searchMinPrice && item.price <= this.searchMaxPrice && item.address.state_code === state;;
  //     })
  //   }  else if (city !== "" && state !=="" && min !== null){
  //     return this.favorites.filter((item) => {
  //       // console.log("everything", this.favorites);
  //       return item.price >= this.searchMinPrice && item.price <= this.searchMaxPrice && item.address.city.toLowerCase().trim().includes(city.toLowerCase().trim()) && item.address.state_code === state;;
  //     })
  //   } 
  // }
