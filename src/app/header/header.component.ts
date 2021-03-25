import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  hideShowMenu = () => {
    this.menuToggle = !this.menuToggle;
  }

}
