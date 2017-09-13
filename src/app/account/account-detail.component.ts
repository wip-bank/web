import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Account } from '../models';
import { AccountService, ApiService } from '../services';

@Component({
  selector: '[app-account-detail]',
  templateUrl: './account-detail.component.html',
  providers: [AccountService, ApiService]
})
export class AccountDetailComponent {
  @Input('account') account: Account;
  @Output() error: EventEmitter<string> = new EventEmitter();
  showDetail: boolean;
  updateAccountForm = this.formBuilder.group({
    owner: ['', Validators.required]
  });

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
      this.showDetail = false;
    }, (error: any) => {
      this.error.emit(error);
    });
  }
}
