import { Component, OnInit } from '@angular/core';
import { RealtorService } from '../realtor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private realtorService: RealtorService) {}

  ngOnInit(): void {

  }


}
