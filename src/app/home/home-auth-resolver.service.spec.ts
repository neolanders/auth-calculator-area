import { inject, TestBed } from '@angular/core/testing';
import { HomeAuthResolverService } from './home-auth-resolver.service';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {
  ApiService,
  JwtService,
  SharedModule,
  UserService
} from '../shared';

import { metaReducers, reducers } from '../shared/store/meta.reducers';

describe('HomeAuthResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        ApiService,
        JwtService,
        HomeAuthResolverService
      ]
    });
  });

  it('should be created', inject([HomeAuthResolverService], (service: HomeAuthResolverService) => {
    expect(service)
    .toBeTruthy();
  }));
});
