import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/components/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.getUserRole().subscribe((role) => {
            this.model = this.filterMenuItems(role);
        });
    }

    filterMenuItems(role: string): any[] {
        switch (role) {
            case 'IT_ADMIN':
                return this.modelForITAdmin();
            case 'ADMIN':
                return this.modelForAdmin();
            case 'COMPANY_ADMIN':
                return this.modelForCompanyAdmin();
            default:
                return [];
        }
    }

    modelForITAdmin(): any[] {
        return [
            {
                label: 'Admin İşlemleri',
                items: [
                    {
                        label: 'IT Admin İşlemleri',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/company/adminManagement'],
                    },
                ],
            },
        ];
    }

    modelForAdmin(): any[] {
        console.log('modelForAdmin çalışıyor');
        return [
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
                label: 'Admin İşlemleri',
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

    modelForCompanyAdmin(): any[] {
        return [
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
        ];
    }
}
