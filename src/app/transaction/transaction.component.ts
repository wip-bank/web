import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Transaction } from '../models';
import { TransactionService, ApiService } from '../services';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction.component.html',
  providers: [TransactionService, ApiService]
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];
  messages: any[];
  createTransactionForm = this.formBuilder.group({
    receiverNumber: ['', Validators.required],
    amount: ['', Validators.required],
    reference: ['', Validators.required]
  });

  constructor(
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messages = [];
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAll().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  createTransaction() {
    const receiverNumber = this.createTransactionForm.value.receiverNumber;
    const amount = this.createTransactionForm.value.amount;
    const reference = this.createTransactionForm.value.reference;
    this.transactionService.create(receiverNumber, amount, reference)
      .subscribe(() => {
        this.createTransactionForm.reset();
        this.getAllTransactions();
        this.flash({
          type: 'success',
          message: 'Transaction executed successfully'
        });
      }, (error: any) => {
        this.flash({
          type: 'error',
          message: error.error
        });
      });
  }

  flash(message) {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.shift();
    }, 5000);
  }
}
