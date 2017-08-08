import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TransactionComponent } from './transaction.component';

const transactionRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'transaction',
    component: TransactionComponent
  }
]);

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    transactionRouting
  ]
})
export class TransactionModule { }
