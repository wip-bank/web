import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Account } from '../models';
import { AccountService, ApiService } from '../services';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html',
  providers: [AccountService, ApiService]
})
export class AccountComponent implements OnInit {
  accounts: Account[];
  messages: any[];
  createAccountForm = this.formBuilder.group({
    owner: ['', Validators.required]
  });

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messages = [];
    this.loadData();
  }

  loadData() {
    this.accountService.getAll().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    });
  }

  createAccount() {
    const owner = this.createAccountForm.value.owner;
    this.createAccountForm.reset();
    this.accountService.create(owner).subscribe((account: Account) => {
      this.loadData();
      this.flash({
        type: 'success',
        message: `Account '${account.number}' created successfully`
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
