import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
