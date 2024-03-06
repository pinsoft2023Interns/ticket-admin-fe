import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerOperationsComponent } from './customerOperations.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CustomerOperationsComponent }
    ])],
    exports: [RouterModule]
})
export class CustomerOperationsRoutingModule { }
