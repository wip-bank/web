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
  transactions: Transaction[];
  detailansicht_btn_name: String = 'Detailansicht öffnen';

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
      this.transactions = this.account.transactions;
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
    Ermittelt die Transaktionen eines Accounts und öffnet die Detailansicht.
    @author: Daniel Sawenko
  */
  showDetailView() {
    this.accountService.get(this.account.number).subscribe((account: Account) =>{
      this.account = account;
      this.transactions = this.account.transactions;
    });
    this.showDetail = !this.showDetail;
    if (this.showDetail)
      this.detailansicht_btn_name = 'Detailansicht schließen';
    else
      this.detailansicht_btn_name = 'Detailansicht öffnen';
  }

}
