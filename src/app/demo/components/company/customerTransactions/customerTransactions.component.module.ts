import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerTransactionsComponent } from './customerTransactions.component';
import { CustomerTransactionsRoutingModule } from './customerTransactions.component.routing';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        CustomerTransactionsRoutingModule,
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        // SliderModule,
        InputTextModule,
        // ToggleButtonModule,
        RippleModule,
        // MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
    ],
    declarations: [CustomerTransactionsComponent],
})
export class CustomerTransactionsComponentModule {}
