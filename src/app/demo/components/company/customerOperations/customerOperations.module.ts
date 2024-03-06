import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOperationsRoutingModule } from './customerOperations-routing.module';
import { CustomerOperationsComponent } from './customerOperations.component';

@NgModule({
    imports: [
        CommonModule,
        CustomerOperationsRoutingModule
    ],
    declarations: [CustomerOperationsComponent]
})
export class CustomerOperationsModule { }
