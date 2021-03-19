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
  searchCityTerm: string = "";
  searchStateTerm: string = "";

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.favorites = this.realtorService.getFavorites();
    console.log("favs array: " + this.favorites);
  }

  getAndSetFavorites = (favorite: any) => {
    this.realtorService.toggleFavorites(favorite);
    this.favorites = this.realtorService.getFavorites();
  };

  setSearchCityTerm = (form: NgForm):void => {
    this.searchCityTerm = form.form.value.searchCity;
  };
  
  setSearchStateTerm = (form: NgForm):void => {
    this.searchStateTerm = form.form.value.state;
  };

  filterFavorites = (city:string):any[] => {
    if (city === "") {
      return this.favorites;
    } else {
      return this.favorites.filter((item) => {
        return item.address.line === city;
      })
    }
  }
}
