import { async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { authRoutes } from './auth.module';
import { AuthComponent } from './auth.component';
import { StoreModule } from '@ngrx/store';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

import {
  ApiService,
  JwtService,
  SharedModule,
  UserService
} from '../shared';

import { metaReducers, reducers } from '../shared/store/meta.reducers';

describe('AuthComponent', () => {
  let injector: TestBed;
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let location: Location;
  let service: UserService;
  let httpMock: HttpTestingController;

  const credentials = {
    email: 'user@fakemail.com',
    password: 'pass'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(authRoutes)
      ],
      providers: [
        UserService,
        ApiService,
        JwtService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });

  it('should display "Sign in" form when navigate to "/login"', fakeAsync(() => {
    router.navigate(['/login'])
    .then(() => {
      expect(location.path())
      .toBe('/login');
      const h1: any = fixture.nativeElement.querySelector('h1');
      expect(h1 !== null)
      .toBe(true);
      expect(h1.toContain('Sign in'));
    });
  }));

  describe('authentification process', () => {

    beforeEach(() => {
      component.authForm.setValue(credentials);
      component.submitForm();
    });

    it('should update isSubmitting after form submitted', () => {
      expect(component.isSubmitting)
        .toBeTruthy();
    });

    it('should attempt Authentification (userService.attemptAuth) then navigate to home route', () => {
      service
        .attemptAuth('login', credentials)
        .subscribe(data => {

      });

      const dummyUsers = {
        user: {
          email: 'user@fakemail.com',
          password: 'pass',
          username: 'test',
          id: 1,
          token: 'dddddddd'
        }
      };

      const req = httpMock.expectOne(`${environment.api_url}/users`);
      expect(req.request.method)
        .toBe('POST');
      req.flush(dummyUsers);
    });
  });

  it('should display an error message if provided', () => {
    component.errors['email_or_password'] = 'email or password is invalid';
    fixture.detectChanges();
    const myclcListErrorsDebugEl: any = fixture.nativeElement.querySelector('myclc-list-errors');
    expect(myclcListErrorsDebugEl !== null)
      .toBe(true);
  });

  it('should display "Sign up" form when navigate to "/register"', fakeAsync(() => {
    router.navigate(['/register'])
    .then(() => {
      expect(location.path())
      .toBe('/register');
      const h1: any = fixture.nativeElement.querySelector('h1');
      expect(h1 !== null)
      .toBe(true);
      expect(h1.toContain('Sign up'));
    });
  }));

});
