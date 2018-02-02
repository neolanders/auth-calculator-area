import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import {
  ApiService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  JwtService,
  SharedModule,
  UserService
} from './shared';

import { metaReducers, reducers } from './shared/store/meta.reducers';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    rootRouting,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'NgRxUserStore',
      logOnly: environment.production
    }),
    AuthModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
