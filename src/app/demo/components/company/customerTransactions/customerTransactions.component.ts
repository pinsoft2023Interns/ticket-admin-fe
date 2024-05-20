import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { CustomerService } from 'src/app/demo/service/customer.service';

interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './customerTransactions.component.html',
})
export class CustomerTransactionsComponent implements OnInit {
    ticketData: any[] = [];

    coupon: any[] = [];

    customers: Customer[] = [];

    products: Product[] = [];

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
        private customerService: CustomerService,
        private productService: ProductService,
        private http: HttpClient
    ) {}

    async ngOnInit() {
        try {
            this.customers = await this.customerService.getCustomersLarge();
            this.loading = false;
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    
        this.http.get<any[]>('https://ticket-web-be-6ogu.onrender.com/company').subscribe(
            (data) => { this.ticketData = data; },
            (error) => { console.error('API isteği sırasında hata oluştu:', error); }
        );
    
        this.http.get('https://ticket-web-be-6ogu.onrender.com/coupon').subscribe(
            (data: any[]) => {
                this.coupon = data;
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

        if (this.customers) {
            for (let i = 0; i < this.customers.length; i++) {
                const rowData = this.customers[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = {
                        index: 0,
                        size: 1,
                    };
                } else {
                    const previousRowData = this.customers[i - 1];
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
    
    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach((product) =>
                product && product.name
                    ? (this.expandedRows[product.name] = true)
                    : ''
            );
        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
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