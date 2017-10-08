import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Transaction } from '../models';

/**
 * Service für Transaktions bezogene Interaktion mit dem Server
 * @author Philipp Dyck
 */
@Injectable()
export class TransactionService {
  constructor(private apiService: ApiService) {}

  /**
   * Alle Transaktionen holen
   * @author Philipp Dyck
   */
  getAll(): Observable<Transaction[]> {
    return this.apiService.get('/transaction')
      .map((data) => data.transactions);
  }

  /**
   * Eine neue Transaktion erstellen
   * Der Sender ist immer die Bank, weil dieser Client nur zur Verwaltung verwendet wird
   * @author Philipp Dyck
   */
  create(receiverNumber: string, amount: string, reference: string): Observable<string> {
    return this.apiService.postFormData('/transaction', {
      senderNumber: '0000',
      receiverNumber,
      amount,
      reference
    });
  }
}
