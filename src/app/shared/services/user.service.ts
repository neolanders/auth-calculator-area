import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user/user.actions';
import * as fromUser from '../store/user/user.reducers';
import * as LogsActions from '../store/logs/logs.actions';
import * as fromLogs from '../store/logs/index';
import { Log } from '../models/logs.model';

interface AppState {
  user: User;
}

@Injectable()
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken()); // persist state when token

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private userStore: Store<fromUser.State>,
    private logsStore: Store<fromLogs.State>
  ) {}

  public checkIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Verify if we have token the user is loggedIn
  hasToken(): boolean {
    return !!this.jwtService.getToken();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate(): void {

    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User): void {

    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);

    // Save current user data into Store
    this.userStore.dispatch(new UserActions.AddUser({user}));

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(): void {

    // Remove JWT from localstorage
    this.jwtService.destroyToken();

    // Set current user to an empty object in Store
    this.userStore.dispatch(new UserActions.RemoveUser({} as User));

    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';

    return this.apiService.post(`/users${route}`, {user: credentials})
      .pipe(map(
      data => {
        this.setAuth(data.user);

        return data;
      }
    ));
  }

  // Update the user on the server (email, pass, etc)
  update(userData): Observable<User> {
    return this.apiService
    .put('/user', { userData })
    .pipe(map(user => {
      // Update the currentUser
      this.userStore.dispatch(new UserActions.UpdateUser({user}));

      return userData.user;
    }));
  }
}
