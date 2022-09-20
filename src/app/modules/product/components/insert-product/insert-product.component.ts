import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit, OnDestroy {
  form?: FormGroup;
  shouldDisplayMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, public loadingService: LoadingService, private subscriptionService: SubscriptionService, private productService: ProductService,
    private errorService: ErrorService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptionService.cleanSubscriptions();
  }

  private saveProduct(): void {
    this.loadingService.displayLoading();
    let subscription: Subscription = this.productService.saveProduct({ name: this.getNameValue(), price: this.getPriceValue(), amount: this.getAmountValue() }).subscribe({
      next: () => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.cleanForm();
        this.displayMessage('success', 'Sucesso na Inserção', 'Produto cadastrado com sucesso');
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
        if (error.error.message === undefined) {
          this.displayMessage('error', 'Erro na Inserção', 'Não foi possível conectar ao servidor');
        } else {
          this.displayMessage('error', 'Erro na Inserção', error.error.message);
        }
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public displayMessage(severity: string, summary: string, detail: string): void {
    this.shouldDisplayMessage = true;
    this.messageService.add({ severity, summary, detail });
  }

  public closeMessage(): void {
    this.shouldDisplayMessage = false;
    this.messageService.clear();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  public handleSubmit(): void {
    if (this.form!.valid) {
      this.saveProduct();
    }
  }

  public shouldDisableForm(): boolean {
    return this.form!.invalid || this.loadingService.getIsLoading();
  }

  private cleanForm(): void {
    this.form!.reset();
  }

  private getNameValue(): string {
    return this.form!.get('name')!.value;
  }

  private getPriceValue(): number {
    return this.form!.get('price')!.value;
  }

  private getAmountValue(): number {
    return this.form!.get('amount')!.value;
  }

}