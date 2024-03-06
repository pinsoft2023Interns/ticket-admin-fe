import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineDemoRoutingModule } from './voyageOperations-routing.module';
import { VoyageOperationsComponent } from './voyageOperations.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        TimelineDemoRoutingModule
    ],
    declarations: [VoyageOperationsComponent]
})
export class VoyageOperationsModule { }
