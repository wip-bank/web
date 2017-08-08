import { Account } from './account.model';

export class Transaction {
  id: number;
  sender: Account;
  receiver: Account;
  amount: number;
  reference: string;
  transactionDate: Date;
}
