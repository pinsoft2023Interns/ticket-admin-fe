import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItadminManageComponent } from './itadminManage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ItadminManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ItadminManageComponentRouting {}
