import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit {
  transactions = [];

  constructor(private transactionService: TransactionService, private router: Router) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
  }

  viewDetails(id: number) {
    this.router.navigate(['/transaction-details', id]);
  }
}
