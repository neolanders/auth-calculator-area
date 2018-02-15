import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'myclc-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Home');
    this.route.data.subscribe((data: { isAuthenticated: boolean }) => {
      this.isAuthenticated = data.isAuthenticated;
    });
  }
}
