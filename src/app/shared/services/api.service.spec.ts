import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        HttpClient,
        JwtService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ApiService, HttpClient, JwtService], (service: ApiService) => {
    expect(service)
    .toBeTruthy();
  }));
});
