import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import {
  ApiService,
  FooterComponent,
  HeaderComponent,
  JwtService,
  SharedModule,
  UserService
} from './shared';

import { metaReducers, reducers } from './shared/store/meta.reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule
      ],
      providers: [
        UserService,
        ApiService,
        JwtService
      ]
    })
    .compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app)
    .toBeTruthy();
  }));
});
