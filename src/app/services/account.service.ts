import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Account } from '../models';

/**
 * Service für Account bezogene Interaktion mit dem Server
 * @author Philipp Dyck
 */
@Injectable()
export class AccountService {
  constructor(private apiService: ApiService) {}

  /**
   * Einen Account finden
   * @author Philipp Dyck
   */
  get(number: string): Observable<Account> {
    return this.apiService.get(`/account/${number}`);
  }

  /**
   * Alle Accounts abfragen
   * @author Philipp Dyck
   */
  getAll(): Observable<Account[]> {
    return this.apiService.get('/account')
      .map((data) => data.accounts);
  }

  /**
   * Einen neuen Account erstellen
   * @author Philipp Dyck
   */
  create(owner: string): Observable<Account> {
    return this.apiService.postFormData('/account', { owner });
  }

  /**
   * Den Namen eines Accounts ändern
   * @author Philipp Dyck
   */
  update(number: string, owner: string): Observable<Account> {
    return this.apiService.putFormData(`/account/${number}`, { owner });
  }
}
