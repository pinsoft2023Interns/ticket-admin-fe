import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VoyageOperationsComponent } from './voyageOperations.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VoyageOperationsComponent }
    ])],
    exports: [RouterModule]
})
export class TimelineDemoRoutingModule { }
