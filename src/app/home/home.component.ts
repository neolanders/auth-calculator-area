import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'myclc-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Home');
    this.userService.checkIsAuthenticated()
    .subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
      }
    );
  }
}
