import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  houseData: any;

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {
    this.realtorService.getListing();
  }

  onSubmit = (form: NgForm) => {
    console.log(form);
    console.log(form.value.searchEvent);
    this.realtorService
      .searchListings(form.value.searchEvent)
      .subscribe((response: any) => {
        console.log(response);
        this.realtorService = response;
      });
  };
}
