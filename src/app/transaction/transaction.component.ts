import { Component, OnInit } from '@angular/core';

import { Transaction } from '../models';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];

  ngOnInit() {
    this.transactions = [];
  }

}
