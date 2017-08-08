import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    accountRouting
  ]
})
export class AccountModule { }
