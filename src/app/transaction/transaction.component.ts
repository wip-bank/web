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
    for (let i = 0; i < 100; i++) {
      this.transactions.push({
        id: i,
        sender: {
          id: 1,
          owner: 'Alex',
          number: '1001'
        },
        receiver: {
          id: 2,
          owner: 'Daniel',
          number: '1002'
        },
        amount: (Math.floor(Math.random() * 100000) - 500) / 100,
        reference: 'ABC',
        transactionDate: new Date()
      });
    }
  }

}
