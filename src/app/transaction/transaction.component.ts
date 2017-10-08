import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Transaction } from '../models';
import { TransactionService, ApiService } from '../services';

/**
 * Angular Transaktionskomponente
 * Darstellung von alle Transaktionen und Gutschriften für Konten erstellen
 * @author Philipp Dyck
 */
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

  /**
   * Intitialisieren der Komponente
   * @author Philipp Dyck
   */
  ngOnInit() {
    this.messages = [];
    this.getAllTransactions();
  }

  /**
   * Alle Transaktionen holen und darstellen
   * @author Philipp Dyck
   */
  getAllTransactions() {
    this.transactionService.getAll().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  /**
   * Neue Transaktion von Bank an Konto erstellen
   * @author Philipp Dyck
   */
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

  /**
   * Erstellt eine Statusnachricht, die nach 5 Sekunden entfernt wird
   * @author Philipp Dyck
   */
  flash(message) {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.shift();
    }, 5000);
  }
}
