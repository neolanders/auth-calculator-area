import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../index';
import * as fromUser from '../store/user/user.reducers';
import * as sinon from 'sinon';
import { Store } from '@ngrx/store';

xdescribe('UserService', () => {
  const httpMock: HttpTestingController = undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        ApiService,
        HttpClient,
        JwtService],
      imports: [
        HttpClientTestingModule,
        {
          provide: HttpTestingController,
          useValue: httpMock
        }
      ]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service)
    .toBeTruthy();
  }));

  describe('#attemptAuth', inject([UserService], (service: UserService) => {
    it('should return an Observable<User>', () => {
      const dummyUsers: User = {
            email: 'test2@mail.com',
            token: '123454',
            username: 'test'
      };

      service.attemptAuth('login',
        {email: 'test2@mail.com',
         password: '123454'})
          .subscribe(user => {
            expect(user)
              .toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${environment.api_url}/users/login`);
      expect(req.request.method)
        .toBe('POST');
      req.flush(dummyUsers);
    });
  }));

  describe('#populate', inject([UserService], (service: UserService) => {
    it('If JWT in localstorage should load user\'s info.', () => {
      const dummyUsers: User = {
            email: 'test2@mail.com',
            token: '123454',
            username: 'test'
      };
      const spy = sinon.spy(window.localStorage, 'setItem');
      spy.calledWith('jwtToken', 'we23frfefew2121'); // fake JWT Token
      service.populate();

      const req = httpMock.expectOne(`${environment.api_url}/users`);
      expect(req.request.method)
        .toBe('GET');
      req.flush(dummyUsers);
    });
  }));
});
