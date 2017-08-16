import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';

const accountRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account',
    component: AccountComponent
  }
]);

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    accountRouting
  ]
})
export class AccountModule { }
