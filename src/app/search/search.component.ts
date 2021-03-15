import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<NgForm>();

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {}

  emitSearchEvent = (form: NgForm) => {
    console.log(form);
    this.searchEvent.emit(form);
  };
}
