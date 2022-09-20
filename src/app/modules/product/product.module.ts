import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';

import { InsertProductComponent } from './components/insert-product/insert-product.component';
import { RecentProductsComponent } from './components/recent-products/recent-products.component';
import { ProductRoutingModule } from './product-routing.module';
import { ActiveProductsComponent } from './components/active-products/active-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { InactiveProductsComponent } from './components/inactive-products/inactive-products.component';


@NgModule({
  declarations: [
    RecentProductsComponent,
    InsertProductComponent,
    ActiveProductsComponent,
    UpdateProductComponent,
    InactiveProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
