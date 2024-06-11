import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions = [
    { id: 1, date: new Date('2020-10-01'), comments: 'Utility bill' },
    { id: 2, date: new Date('2020-10-15'), comments: '' }
  ];

  getTransactions() {



    return this.transactions;
  }

  getTransactionById(id: number) {
    return this.transactions.find(transaction => transaction.id === id);
  }

}
