import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveProductsComponent } from './components/active-products/active-products.component';
import { InactiveProductsComponent } from './components/inactive-products/inactive-products.component';
import { InsertProductComponent } from './components/insert-product/insert-product.component';
import { RecentProductsComponent } from './components/recent-products/recent-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'recent' },
  { path: 'recent', component: RecentProductsComponent },
  { path: 'insert', component: InsertProductComponent },
  { path: 'active', component: ActiveProductsComponent },
  { path: 'active/update/:id', component: UpdateProductComponent },
  { path: 'inactive', component: InactiveProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
