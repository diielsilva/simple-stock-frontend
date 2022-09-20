import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { DialogService } from 'src/app/services/dialog.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.css']
})
export class RecentProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedProduct?: Product;

  constructor(private productService: ProductService, private subscriptionService: SubscriptionService, public loadingService: LoadingService, public errorService: ErrorService,
    public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getRecentProducts();
  }

  ngOnDestroy(): void {
    this.subscriptionService.cleanSubscriptions();
  }

  private getRecentProducts(): void {
    this.loadingService.displayLoading();
    let subscription$: Subscription = this.productService.getRecentProducts().subscribe({
      next: (products: Product[]) => {
        this.loadingService.hiddenLoading();
        this.errorService.hiddenErrors();
        this.products = products;
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.hiddenLoading();
        this.errorService.displayErrors();
      }
    });
    this.subscriptionService.addSubscription(subscription$);
  }

  public tryAgain(): void {
    this.getRecentProducts();
  }

  public displayProductDetails(product: Product): void {
    this.dialogService.displayDialog();
    this.selectedProduct = product;
  }

}
