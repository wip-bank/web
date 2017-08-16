import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Account } from '../models';

@Injectable()
export class AccountService {
  constructor(private apiService: ApiService) {}

  get(number: string): Observable<Account> {
    return this.apiService.get(`/account/${number}`);
  }

  getAll(): Observable<Account[]> {
    return this.apiService.get('/account')
      .map((data) => data.accounts);
  }

  create(owner: string): Observable<Account> {
    return this.apiService.postFormData('/account', { owner });
  }
}
