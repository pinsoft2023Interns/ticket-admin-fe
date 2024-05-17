import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';


interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './customerTransactions.component.html',
})
export class CustomerTransactionsComponent implements OnInit {
    ticketData: any[] = [];
    coupon: any[] = [];
    // ngOnInit() {

    // }

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {


        this.http
            .get<any[]>('https://ticket-web-be-6ogu.onrender.com/ticket')
            .subscribe(
                (data: any[]) => {
                    this.ticketData = data;
                },
                (error) => {
                    console.error('API isteği sırasında hata oluştu:', error);
                }
            );

        this.http
            .get('https://ticket-web-be-6ogu.onrender.com/coupon')
            .subscribe(
                (data: any[]) => {
                    this.coupon = data;
                    console.log('Coupon List:', this.customers3);
                },
                (error) => {
                    console.error('Error fetching coupon data:', error);
                }
            );
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = {
                        index: 0,
                        size: 1,
                    };
                } else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup =
                        previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    } else {
                        this.rowGroupMetadata[representativeName] = {
                            index: i,
                            size: 1,
                        };
                    }
                }
            }
        }
    }



    formatCurrency(value: number) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
