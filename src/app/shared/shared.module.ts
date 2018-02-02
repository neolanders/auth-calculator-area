import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumericDirective } from './directives/only-numeric.directive';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { HttpClientModule } from '@angular/common/http';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ShowAuthedDirective,
    OnlyNumericDirective,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ShowAuthedDirective,
    OnlyNumericDirective,
    ListErrorsComponent
  ]
})
export class SharedModule { }
