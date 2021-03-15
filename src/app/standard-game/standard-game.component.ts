import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-standard-game',
  templateUrl: './standard-game.component.html',
  styleUrls: ['./standard-game.component.css'],
})
export class StandardGameComponent implements OnInit {
  gameArray: any[] = [];
  // @Output() userInputEvent = new EventEmitter<NgForm>();

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {}

  onLocationSubmit = (form: NgForm) => {
    console.log(form.form.value);
    this.realtorService.searchListings(form).subscribe((response: any) => {
      console.log(response);
      this.gameArray = response;
    });
  };
}
