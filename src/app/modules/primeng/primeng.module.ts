import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [ProgressSpinnerModule, ButtonModule, TableModule, DialogModule, SidebarModule, ToolbarModule, PanelModule, InputTextModule, InputNumberModule, ToastModule]
})
export class PrimengModule { }
