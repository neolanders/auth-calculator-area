import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromUser from '../../../shared/store/user/user.reducers';

@Component({
  selector: 'myclc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser$: Observable<User>;
  public collapsed = true;

  constructor(
    private router: Router,
    private userService: UserService,
    public store: Store<fromUser.State>
  ) {
    this.currentUser$ = store.select(fromUser.getUser);
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
