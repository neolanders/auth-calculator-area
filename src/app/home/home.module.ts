import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeAuthResolverService } from './home-auth-resolver.service';
import { CalculatorComponent } from '../calculator/calculator.component';
import { OperationListComponent } from '../operation-list/operation-list.component';
import { CalculatorService } from '../calculator/calculator.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolverService
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    CalculatorComponent,
    OperationListComponent
  ],
  providers: [
    CalculatorService,
    HomeAuthResolverService
  ]
})
export class HomeModule {}
