import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent implements OnInit {
  transactionForm: FormGroup;
  transactionId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionId = +this.route.snapshot.paramMap.get('id');
    const transaction = this.transactionService.getTransactionById(this.transactionId);

    this.transactionForm = this.fb.group({
      id: [{ value: transaction.id, disabled: true }, Validators.required],
      date: [{ value: this.formatDate(transaction.date), disabled: true }, Validators.required],
      comments: [transaction.comments, [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]]
    });
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  save() {
    if (this.transactionForm.valid) {
      const updatedTransaction = {
        id: this.transactionId,
        date: new Date(this.transactionForm.get('date').value),
        comments: this.transactionForm.get('comments').value
      };
      this.transactionService.updateTransaction(updatedTransaction);
      this.router.navigate(['/']);
    }
  }
}
