import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './account-detail.component';

const accountRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account',
    component: AccountComponent
  }
]);

/**
 * Angular Modul für die Kontoseite
 * @author Philipp Dyck
 */
@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    accountRouting
  ]
})
export class AccountModule { }
