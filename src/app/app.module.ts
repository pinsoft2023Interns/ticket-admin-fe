import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { LocationService } from './demo/service/location.service';
import { IconService } from './demo/service/icon.service';

import { AuthGuard } from './demo/components/auth/auth.guard';
import { MessageService } from 'primeng/api'; // MessageService'i ekleyin
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ToastModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        AuthGuard,

        IconService,

        LocationService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
