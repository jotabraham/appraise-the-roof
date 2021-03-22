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
  favorited: boolean = false;

  constructor(private realtorService: RealtorService) { }

  ngOnInit(): void { }

  favEvent() {
    this.favorited = !this.favorited;
  }

  emitFavoritesEvent = (favorite: any): void => {
    this.favoritesEvent.emit(favorite);
  };
}
