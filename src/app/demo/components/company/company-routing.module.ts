import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'busoperations',
                loadChildren: () =>
                    import('./busOperations/busOperations.module').then(
                        (m) => m.BusOperationsModule
                    ),
            },

            {
                path: 'customerTransactions',
                loadChildren: () =>
                    import(
                        './customerTransactions/customerTransactions.component.module'
                    ).then((m) => m.CustomerTransactionsComponentModule),
            },
            {
                path: 'adminManagement',
                loadChildren: () =>
                    import(
                        '../itadminManage/itadminManage.component.module'
                    ).then((m) => m.ItadminManageComponentModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CompanyRoutingModule {}
