import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  form?: FormGroup
  private productId?: number;
  shoudDisableButton: boolean = false;
  shoudDisplayMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, public loadingService: LoadingService, public errorService: ErrorService, private subscriptionService: SubscriptionService,
    private productService: ProductService, private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.createForm();
    this.getActiveProductById();
  }

  ngOnDestroy(): void {
    this.subscriptionService.cleanSubscriptions();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  private getActiveProductById(): void {
    this.loadingService.displayLoading();
    this.extractProductIdFromUrl();
    let subscription: Subscription = this.productService.getActiveProductById(this.productId!).subscribe({
      next: (product: Product) => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.fillFormValues(product.name!, product.price!, product.amount!);
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
        if (error.error.message === undefined) {
          this.displayMessage('error', 'Erro na Edição', 'Não foi possível se conectar ao servidor');
        } else {
          this.displayMessage('error', 'Erro na Edição', error.error.message);
        }
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  private updateProduct(): void {
    this.loadingService.displayLoading();
    let subscription = this.productService.updateProduct(this.productId!, { name: this.getNameValue(), price: this.getPriceValue(), amount: this.getAmountValue() }).subscribe({
      next: () => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.displayMessage('success', 'Sucesso na Edição', 'Produto atualizado com sucesso');
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
        if (error.error.message === undefined) {
          this.displayMessage('error', 'Erro na Edição', 'Não foi possível se conectar ao servidor');
        } else {
          this.displayMessage('error', 'Erro na Edição', error.error.message);
        }
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public handleSubmit(): void {
    if (this.form!.valid) {
      this.updateProduct();
    }
  }

  private fillFormValues(name: string, price: number, amount: number): void {
    this.form!.get('name')!.setValue(name);
    this.form!.get('price')!.setValue(price);
    this.form!.get('amount')!.setValue(amount);
  }

  private extractProductIdFromUrl(): void {
    let subscription: Subscription = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.productId = params['id'];
      },
      error: (error: any) => console.error(error)
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public shouldDisableForm(): boolean {
    return this.form!.invalid || this.loadingService.getIsLoading();
  }

  public displayMessage(severity: string, summary: string, detail: string): void {
    this.shoudDisplayMessage = true;
    this.messageService.add({ severity, summary, detail });
  }

  public closeMessage(): void {
    this.shoudDisplayMessage = false;
    this.messageService.clear();
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
