import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-inactive-products',
  templateUrl: './inactive-products.component.html',
  styleUrls: ['./inactive-products.component.css']
})
export class InactiveProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  actualPage: number = 0;
  totalOfProducts: number = 0;
  shouldDisplayMessage: boolean = false;

  constructor(public loadingService: LoadingService, private messageService: MessageService, private productService: ProductService, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getInactiveProducts();
  }

  ngOnDestroy(): void {
    this.subscriptionService.cleanSubscriptions();
  }

  public getInactiveProducts(): void {
    this.loadingService.displayLoading();
    let subscription: Subscription = this.productService.getInactiveProducts(this.actualPage).subscribe({
      next: (response: any) => {
        this.loadingService.hiddenLoading();
        this.products = response.content;
        this.totalOfProducts = response.totalElements;
      },
      error: () => {
        this.loadingService.hiddenLoading();
        this.displayMessage('error', 'Erro na Listagem', 'Não foi possível se conectar ao servidor');
        this.resetPaginatorAndProducts();
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public activeInactiveProduct(id: number): void {
    this.loadingService.displayLoading();
    let subscription: Subscription = this.productService.activeInactiveProduct(id).subscribe({
      next: () => {
        this.loadingService.hiddenLoading();
        this.displayMessage('success', 'Sucesso na Ativação', 'O produto foi ativado com sucesso');
        this.getInactiveProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        if (error.error.message === undefined) {
          this.displayMessage('error', 'Erro na Ativação', 'Não foi possível se conectar ao servidor');
        } else {
          this.displayMessage('error', 'Erro na Ativação', error.error.message);
        }
        this.resetPaginatorAndProducts();
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public handlePageChange(event: LazyLoadEvent): void {
    this.actualPage = this.changeActualPage(event.first!);
    this.getInactiveProducts();
  }

  public displayMessage(severity: string, summary: string, detail: string): void {
    this.shouldDisplayMessage = true;
    this.messageService.add({ severity, summary, detail });
  }

  public closeMessage(): void {
    this.shouldDisplayMessage = false;
    this.messageService.clear();
  }

  private changeActualPage(rows: number): number {
    return rows / 20;
  }

  private resetPaginatorAndProducts(): void {
    this.products = [];
    this.actualPage = 0;
    this.totalOfProducts = 0;
  }
}
