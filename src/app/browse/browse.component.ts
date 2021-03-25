import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  houseData: any;
  formSubmitted: boolean = false;

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void { }

  getAndSetFavorites = (favorite: any) => {
    this.realtorService.toggleFavorites(favorite);
  };

  onSubmit = (form: NgForm) => {
    this.formSubmitted = true;
    this.realtorService.searchListings(form).subscribe((response: any) => {
      this.houseData = response.properties.filter((item) => {
        return (
          item.hasOwnProperty("thumbnail") &&
          item.hasOwnProperty("price") &&
          item.hasOwnProperty("building_size") &&
          item.hasOwnProperty("beds") &&
          item.hasOwnProperty("baths") &&
          item.hasOwnProperty("lot_size") &&
          item.hasOwnProperty("address")
        );
      });
    });
  };
}
