import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styleUrls: ['./active-products.component.css']
})
export class ActiveProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  actualPage: number = 0;
  totalOfProducts: number = 0;
  shouldDisplayMessage: boolean = false;

  constructor(public loadingService: LoadingService, public errorService: ErrorService, private productService: ProductService, private subscriptionService: SubscriptionService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getActiveProducts();
  }

  ngOnDestroy(): void {
    this.subscriptionService.cleanSubscriptions();
  }

  private getActiveProducts(): void {
    this.loadingService.displayLoading();
    let subscription: Subscription = this.productService.getActiveProducts(this.actualPage).subscribe({
      next: (response: any) => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.products = response.content;
        this.totalOfProducts = response.totalElements;
      },
      error: () => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
        this.displayMessage('error', 'Erro na Listagem', 'Não foi possível se conectar ao servidor');
        this.resetPaginatorAndProducts();
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public deleteProduct(id: number): void {
    this.loadingService.displayLoading();
    let subscription: Subscription = this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.displayMessage('success', 'Sucesso na Remoção', 'O produto foi removido com sucesso');
        this.getActiveProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
        if (error.error.message === undefined) {
          this.displayMessage('error', 'Erro na Remoção', 'Não foi possível se conectar ao servidor');
          this.resetPaginatorAndProducts();
        } else {
          this.displayMessage('error', 'Erro na Remoção', error.error.message);
          this.getActiveProducts();
        }
      }
    });
    this.subscriptionService.addSubscription(subscription);
  }

  public handlePageChange(event: LazyLoadEvent): void {
    this.actualPage = this.changeActualPage(event.first!);
    this.getActiveProducts();
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
