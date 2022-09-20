import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSidebarVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public displayOrHiddenSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
