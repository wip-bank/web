import { Component, OnInit } from '@angular/core';

import { Account } from '../models';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  ngOnInit() {
    this.accounts = [
      {
        id: 1,
        owner: 'Alex',
        number: '1001'
      },
      {
        id: 2,
        owner: 'Daniel',
        number: '1002',
      },
      {
        id: 3,
        owner: 'Jannis',
        number: '1003',
      },
      {
        id: 4,
        owner: 'Philipp',
        number: '1004',
      }
    ];
  }

}
