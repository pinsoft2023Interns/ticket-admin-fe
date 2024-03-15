import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
<<<<<<< HEAD
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AuthGuard } from './demo/components/auth/auth.guard'; // AuthGuard'ı import et
=======
>>>>>>> 68b45650e4660ba2e196792bc6c96c1f41a1cc2f

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
<<<<<<< HEAD
                    component: LoginComponent,
                },
                {
                    path: '',
=======
>>>>>>> 68b45650e4660ba2e196792bc6c96c1f41a1cc2f
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'company',
                            loadChildren: () =>
                                import(
                                    './demo/components/company/company.module'
                                ).then((m) => m.CompanyModule),
<<<<<<< HEAD
                            canActivate: [AuthGuard], // AuthGuard'ı canActivate dizisine ekle
                        },
=======
                        },
                        // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                        // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                        // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
>>>>>>> 68b45650e4660ba2e196792bc6c96c1f41a1cc2f
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
<<<<<<< HEAD
=======
                // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
>>>>>>> 68b45650e4660ba2e196792bc6c96c1f41a1cc2f
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
