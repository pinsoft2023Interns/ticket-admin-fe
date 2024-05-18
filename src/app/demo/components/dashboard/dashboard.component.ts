import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BusNavigation } from 'src/app/demo/api/bus-navigation';
import { BusNavigationService } from 'src/app/demo/service/bus-navigation.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './dashboard.component.html',
    selector: 'app-dashboard',
})
export class DashboardComponent implements OnInit {
    busNavigations: BusNavigation[] = [];
    loading: boolean = true;
    statuses: any[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;

    constructor(private busNavigationService: BusNavigationService) {}

    ngOnInit(): void {
        this.busNavigationService.getBusNavigation().subscribe((data) => {
            this.busNavigations = data;
            console.log('otobusbilgileri', data);
            this.loading = false;
        });
    }
}
