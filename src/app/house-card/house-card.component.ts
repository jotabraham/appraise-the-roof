import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css'],
})
export class HouseCardComponent implements OnInit {
  @Input() houseRef: any;
  @Input() favoritesRef!: any[];
  @Output() favoritesEvent = new EventEmitter<any>();

  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {}

  emitFavoritesEvent = (favorite: any): void => {
    this.favoritesEvent.emit(favorite);
  };
}
