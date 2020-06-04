import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'Maharaja Computers';
  private menuVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.menuVisible = false;
  }

  onToggle() {
    this.menuVisible = !this.menuVisible;
  }

  isMenuVisible() {
    if (window.innerWidth <= 767) {
      return this.menuVisible;
    } else {
      return true;
    }
  }

}
