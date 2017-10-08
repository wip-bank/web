import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionComponent } from './transaction.component';

const transactionRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'transaction',
    component: TransactionComponent
  }
]);

/**
 * Angular Modul für die Transaktionsseite
 * @author Philipp Dyck
 */
@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    transactionRouting
  ]
})
export class TransactionModule { }
