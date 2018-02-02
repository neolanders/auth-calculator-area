import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationListComponent } from './operation-list.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculatorService } from '../calculator/calculator.service';

import {
  SharedModule
} from '../shared';

import { metaReducers, reducers } from '../shared/store/meta.reducers';

describe('OperationsListComponent', () => {
  let component: OperationListComponent;
  let fixture: ComponentFixture<OperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationListComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule
      ],
      providers: [
        CalculatorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
