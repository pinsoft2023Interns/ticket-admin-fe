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
                path: 'customeroperations',
                loadChildren: () =>
                    import(
                        './customerOperations/customerOperations.module'
                    ).then((m) => m.CustomerOperationsModule),
            },
            {
                path: 'voyageoperations',
                loadChildren: () =>
                    import('./voyageOperations/voyageOperations.module').then(
                        (m) => m.VoyageOperationsModule
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
<<<<<<< HEAD
                        '../itadminManage/itadminManage.component.module'
=======
                        './itadminManage/itadminManage.component.module'
>>>>>>> e9941a79e87ad6b459ef37a95c8991bbeb6e93d1
                    ).then((m) => m.ItadminManageComponentModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
<<<<<<< HEAD
export class CompanyRoutingModule {}
=======
export class CompanyRoutingModule { }
>>>>>>> e9941a79e87ad6b459ef37a95c8991bbeb6e93d1

// adminManagement
