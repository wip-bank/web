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
  errors: any[];
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
    this.errors = [];
    this.transactionService.getAll().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  createTransaction(){
    const receiverNumber = this.createTransactionForm.value.receiverNumber;
    const amount = this.createTransactionForm.value.amount;
    const reference = this.createTransactionForm.value.reference;
    this.createTransactionForm.reset();
    this.transactionService.create(receiverNumber, amount, reference).subscribe((transaction: Transaction) => {
    this.ngOnInit();
  }, (error: any) => {
    this.pushError(error);
  });
  }

  pushError(error) {
    this.errors.push(error);
    setTimeout(() => {
      this.errors.shift();
    }, 5000);
  }
}
