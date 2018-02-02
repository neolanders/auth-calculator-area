import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculatorService } from '../calculator/calculator.service';

import {
  SharedModule, HeaderService
} from '../shared';

import { metaReducers, reducers } from '../shared/store/meta.reducers';

describe('CalculatorComponent', () => {
  let injector: TestBed;
  let service: CalculatorService;
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule
      ],
      providers: [
        CalculatorService,
        HeaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(CalculatorService);
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });

  describe('"Digit" button is clicked "1234567890', () => {
    beforeEach(() => {
      component.history = ''; // dummy history
      component.onDigit('7');
      fixture.detectChanges();
    });
    it('should move back digit', () => {
      expect(component.history)
        .toBe('7');
    });
  });

  describe('"Equal" button is clicked', () => {
    const expectedResult = 30;
    beforeEach(() => {
      component.history = '6x5'; // dummy history
      component.onAnswer();
      fixture.detectChanges();
    });
    it('should call calcService with equation', () => {
      service.evaluate('5*6')
        .then((result: any) => {
          expect(result)
            .toBe(expectedResult);

          it('should display the right answer', () => {
              expect(component.result)
                .toBe(expectedResult.toString());
          });
        });
    });
  });

  describe('"Action" button is clicked "X, -, +, - or /"', () => {
    beforeEach(() => {
      component.history = '7'; // dummy history
      component.onAction('x');
      fixture.detectChanges();
    });
    it('should add operation to history', () => {
      expect(component.history)
        .toBe('7x');
    });
  });

  describe('"Back" button is clicked', () => {
    let previousHistory = '';
    beforeEach(() => {
      component.history = '7x58x4'; // dummy history
      previousHistory = component.history.toString();
      component.onBack();
      fixture.detectChanges();
    });
    it('should move back digit', () => {
      expect(component.history)
        .toBe('7x58x');
    });
  });

  describe('"Clear" button is clicked', () => {
    beforeEach(() => {
      component.history = '7x5x8'; // dummy history
      component.result = '280'; // dummy result
      component.onClear();
      fixture.detectChanges();
    });
    it('should reset history and result', () => {
      expect(component.history)
        .toBe('');
      expect(component.result)
        .toBe('');
    });
  });
});
