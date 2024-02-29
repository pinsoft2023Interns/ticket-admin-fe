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
                        label: 'Seferler',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['dashboard/Seferler'],
                    },
                ],
            },
            {
                label: 'LeftBar',
                items: [
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['dashboard/uikit/table'],
                    },
                    {
                        label: 'Firmalar',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['dashboard/uikit/panel'],
                    },
                    {
                        label: 'Yeni kullanıcı ve admin ekleme',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['dashboard/uikit/media'],
                    },
                    {
                        label: 'Güzergahlar',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['dashboard/uikit/menu'],
                        routerLinkActiveOptions: {
                            paths: 'subset',
                            queryParams: 'ignored',
                            matrixParams: 'ignored',
                            fragment: 'ignored',
                        },
                    },
                    {
                        label: 'Personel ve yolcular',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['dashboard/uikit/message'],
                    },
                    // {
                    //     label: 'File',
                    //     icon: 'pi pi-fw pi-file',
                    //     routerLink: ['/uikit/file'],
                    // },
                    {
                        label: 'Chart',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['dashboard/uikit/charts'],
                    },
                    {
                        label: 'Görüş ve önerileriniz',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['dashboard/uikit/input'],
                    },
                ],
            },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         {
            //             label: 'Free Blocks',
            //             icon: 'pi pi-fw pi-eye',
            //             routerLink: ['/blocks'],
            //             badge: 'NEW',
            //         },
            //         {
            //             label: 'All Blocks',
            //             icon: 'pi pi-fw pi-globe',
            //             url: ['https://www.primefaces.org/primeblocks-ng'],
            //             target: '_blank',
            //         },
            //     ],
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         {
            //             label: 'PrimeIcons',
            //             icon: 'pi pi-fw pi-prime',
            //             routerLink: ['/utilities/icons'],
            //         },
            //         {
            //             label: 'PrimeFlex',
            //             icon: 'pi pi-fw pi-desktop',
            //             url: ['https://www.primefaces.org/primeflex/'],
            //             target: '_blank',
            //         },
            //     ],
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing'],
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login'],
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error'],
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access'],
            //                 },
            //             ],
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud'],
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline'],
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound'],
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty'],
            //         },
            //     ],
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.1.1',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.2',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.3',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                     ],
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.2.1',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                     ],
            //                 },
            //             ],
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.1.1',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                         {
            //                             label: 'Submenu 2.1.2',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                     ],
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.2.1',
            //                             icon: 'pi pi-fw pi-bookmark',
            //                         },
            //                     ],
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-question',
            //             routerLink: ['/documentation'],
            //         },
            //         {
            //             label: 'View Source',
            //             icon: 'pi pi-fw pi-search',
            //             url: ['https://github.com/primefaces/sakai-ng'],
            //             target: '_blank',
            //         },
            //     ],
            // },
        ];
    }
}
