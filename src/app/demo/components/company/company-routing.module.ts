import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'busoperations', loadChildren: () => import('./busOperations/busOperations.module').then(m => m.BusOperationsModule) },
        { path: 'customeroperations', loadChildren: () => import('./customerOperations/customerOperations.module').then(m => m.CustomerOperationsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }
