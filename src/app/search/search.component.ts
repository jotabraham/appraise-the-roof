import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<NgForm>();

  constructor() {}

  ngOnInit(): void {}

  emitSearchEvent = (form: NgForm) => {
    this.searchEvent.emit(form);
  };
}
