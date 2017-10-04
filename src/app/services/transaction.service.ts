import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Transaction } from '../models';

@Injectable()
export class TransactionService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Transaction[]> {
    return this.apiService.get('/transaction')
      .map((data) => data.transactions);
  }

  create(receiverNumber: string, amount: string, reference: string): Observable<Transaction> {
    return this.apiService.postFormData('/transaction', { senderNumber: "0000", receiverNumber: receiverNumber, amount: amount, reference: reference});
  }
}
