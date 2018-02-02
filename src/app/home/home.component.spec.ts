import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import {
  ApiService,
  HeaderService,
  JwtService,
  SharedModule,
  UserService
} from '../shared';

import { metaReducers, reducers } from '../shared/store/meta.reducers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockCalculatorComponent,
        MockOperationListComponent
      ],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule
      ],
      providers: [
        UserService,
        ApiService,
        JwtService,
        HeaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});

// MockCalculatorComponent
@Component({
  selector: 'myclc-calculator',
  template: `<ng-content></ng-content>`
})
export class MockCalculatorComponent {

  private history: string;
  private result: string;

  // constructor(private _calcService: CalculatorService) {}

  onDigit(digit): void {
    // empty
  }

  onAction(action): void {
      // empty
  }

  onAnswer(): void {
      // empty
  }

  onBack(): void {
     // empty
  }

  onClear(): void {
      // empty
  }
}

// MockCalculatorComponent
@Component({
  selector: 'myclc-operation-list',
  template: `<ng-content></ng-content>`
})
export class MockOperationListComponent {
}
