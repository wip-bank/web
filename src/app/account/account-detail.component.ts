import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Account, Transaction } from '../models';
import { AccountService, ApiService, TransactionService } from '../services';

@Component({
  selector: '[app-account-detail]',
  templateUrl: './account-detail.component.html',
  providers: [AccountService, ApiService]
})
export class AccountDetailComponent {
  @Input('account') account: Account;
  @Output() error: EventEmitter<any> = new EventEmitter();
  showDetail: boolean;
  updateAccountForm = this.formBuilder.group({
    owner: ['', Validators.required]
  });
  detailansicht_btn_name: String = 'Detailansicht öffnen';
  balance: number;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.showDetail = false;
  }

  updateAccount() {
    const owner = this.updateAccountForm.value.owner;
    this.updateAccountForm.reset();
    this.accountService.update(this.account.number, owner).subscribe((account: Account) => {
      this.account = account;
      this.updateBalance();
      this.showDetail = false;
      this.detailansicht_btn_name = 'Detailansicht öffnen';
      this.error.emit({
        type: 'success',
        message: `Name changed to '${account.owner}'`
      });
    }, (error: any) => {
      this.error.emit({
        type: 'error',
        message: error.error
      });
    });
  }

  /**
   * Ermittelt die Transaktionen des ausgewählten Accounts und öffnet die Detailansicht.
   * Ausnahme: Konto der Bank
   * @author Daniel Sawenko
   */
  showDetailView() {
    if (this.account.number !== '0000') {
      this.accountService.get(this.account.number).subscribe((account: Account) => {
        this.account = account;
        this.updateBalance();
      });
    }
    this.showDetail = !this.showDetail;
    if (this.showDetail) {
      this.detailansicht_btn_name = 'Detailansicht schließen';
    } else {
      this.detailansicht_btn_name = 'Detailansicht öffnen';
    }

  }

  /** Ermittelt den Kontostand des ausgewählten Accounts
   * @author Daniel Sawenko
   */
  updateBalance() {
    this.balance = 0;
    if (this.account.transactions != null) {
      this.account.transactions .forEach(transaction => {
        this.balance += transaction.amount;
      });
    }
  }

}
