import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerTransactionsComponent } from './customerTransactions.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CustomerTransactionsComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomerTransactionsRoutingModule {}
