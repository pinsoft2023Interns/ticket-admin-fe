import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/company/dashboard'],
                    },
                ],
            },
            {
                label: 'Şirket İşlemleri',
                items: [
                    {
                        label: 'Sefer İşlemleri',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/company/busoperations'],
                    },
                    {
                        label: 'Müşteri İşlemleri',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/company/customerTransactions'],
                    },


                ],
            },
            {
                label: 'IT Admin İşlemleri',
                items: [

                    {
                        label: 'Admin İşlemleri',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/company/adminManagement'],
                    },

                ],
            },

        ];
    }
}
