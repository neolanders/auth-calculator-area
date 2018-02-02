import { async, inject, TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, Router, UserService],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard, Router, UserService], (guard: AuthGuard) => {
    expect(guard)
    .toBeTruthy();
  }));
});
