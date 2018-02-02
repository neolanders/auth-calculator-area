import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared';

@Component({
  selector: 'myclc-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.checkIsAuthenticated()
    .subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
      }
    );
  }
}
