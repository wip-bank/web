import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Transaction } from '../models';

@Injectable()
export class TransactionService {
  constructor(private apiService: ApiService) {}

}
