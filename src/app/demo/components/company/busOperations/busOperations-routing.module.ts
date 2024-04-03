import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BusOperationsComponent } from './busOperations.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BusOperationsComponent }
	])],
	exports: [RouterModule]
})
export class BusOperationsRoutingModule { }
