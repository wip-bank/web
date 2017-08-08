import { Transaction } from './transaction.model';

export class Account {
  id: number;
  owner: string;
  number: string;
  transactions?: Transaction[];
}
