import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Account } from '../models';
import { AccountService, ApiService } from '../services';

/**
 * Account Komponente
 * Enthält eine Liste aller Accounts und die Mäglichkeit neue Accounts zu erstellen
 *
 * @author Philipp Dyck
 */
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

  /**
   * Intialisiert die Komponente
   * @author Philipp Dyck
   */
  ngOnInit() {
    this.messages = [];
    this.loadData();
  }

  /**
   * Holt sich die Liste der aktuellen Accounts
   * @author Philipp Dyck
   */
  loadData() {
    this.accountService.getAll().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    });
  }

  /**
   * Erstellt einen neuen Account und zeigt eine Nachricht über den Erfolg des Vorgangs an
   * @author Philipp Dyck
   */
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

  /**
   * Erstellt eine Nachricht, die nach 5 Sekunden entfernt wird
   * @author Philipp Dyck
   */
  flash(message) {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.shift();
    }, 5000);
  }
}
