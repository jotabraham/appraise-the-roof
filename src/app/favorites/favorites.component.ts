import { Component, OnInit } from '@angular/core';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.favorites = this.realtorService.getFavorites();
    console.log(this.favorites);
  }

  getAndSetFavorites = (favorite: any) => {
    this.realtorService.toggleFavorites(favorite);
    this.favorites = this.realtorService.getFavorites();
  };
}
