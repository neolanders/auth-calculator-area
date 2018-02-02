import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  ApiService,
  HeaderComponent,
  JwtService,
  SharedModule,
  UserService
} from '../../../shared';

import { metaReducers, reducers } from '../../../shared/store/meta.reducers';

import * as sinon from 'sinon';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockUserService: UserService;

  beforeEach(async(() => {
    mockUserService = {
      getCurrentUser: () => {
        return Observable.of(undefined);
      }
    } as any;

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        SharedModule,
        RouterModule,
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        ApiService,
        JwtService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });

  it('should have a nav tag', async(() => {
    expect(element.nativeElement.querySelector('nav').textContent);
  }));


  // xit('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent)
  //   .toContain('Welcome to app!');
  // }));

  // it('should call the start method on myService', function () {
  //     sandbox.stub(myService, 'start');
  //     somethingUnderTest.start();
  //     expect(myService.start.calledOnce).to.equal(true);
  // });
});
