import { Component, OnInit } from '@angular/core';

import { Transaction } from '../models';
import { TransactionService, ApiService } from '../services';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction.component.html',
  providers: [TransactionService, ApiService]
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getAll().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }
}
