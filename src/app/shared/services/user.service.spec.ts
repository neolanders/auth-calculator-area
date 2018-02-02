import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../index';

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

      const req = httpMock.expectOne(`${environment.api_url}/users.login`);
      expect(req.request.method)
        .toBe('POST');
      req.flush(dummyUsers);
    });
  }));
});
