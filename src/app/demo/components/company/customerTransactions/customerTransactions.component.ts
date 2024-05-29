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
    matchCompany: any[] = [];
    ticket: any[] = [];
    users: any[] = [];
    usersWithCoupons: any[] = [];
    customers: Customer[] = [];
    representatives: Representative[] = [];
    statuses: any[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private http: HttpClient) {}

    async ngOnInit() {
        const storedCompanyId = localStorage.getItem(
            'ticket-web-admin-companyId'
        );
        const companyId = storedCompanyId
            ? parseInt(storedCompanyId, 10)
            : null;

        this.http
            .get<any[]>('https://ticket-web-be-6ogu.onrender.com/company')
            .subscribe(
                (data) => {
                    if (companyId !== null) {
                        this.ticketData = data.filter(
                            (item) => item.id === companyId
                        );
                        console.log('ticketData', this.ticketData);
                    } else {
                        this.ticketData = data;
                    }
                    console.log('Filtered ticketData', this.ticketData);
                },
                (error) => {
                    console.error('API request error:', error);
                }
            );

        this.http
            .get<any[]>('https://ticket-web-be-6ogu.onrender.com/user_account')
            .subscribe(
                (data: any[]) => {
                    this.users = data;
                    console.log('this.users', this.users);
                    this.filterUsersWithCoupons();
                    console.log(
                        'Filtered users with coupons',
                        this.usersWithCoupons
                    );
                },
                (error) => {
                    console.error('Error fetching user data:', error);
                }
            );

        this.http
            .get('https://ticket-web-be-6ogu.onrender.com/coupon')
            .subscribe(
                (data: any[]) => {
                    this.coupon = data;
                    console.log('this.coupon', this.coupon);
                },
                (error) => {
                    console.error('Error fetching coupon data:', error);
                }
            );
        console.log('companyId', companyId);

        if (companyId !== null) {
            this.http
                .get<any[]>(
                    `https://ticket-web-be-6ogu.onrender.com/company/${companyId}`
                )
                .subscribe(
                    (data: any[]) => {
                        this.matchCompany = data;
                        console.log('this.matchCompany', this.matchCompany);
                    },
                    (error) => {
                        console.error('Error fetching coupon data:', error);
                    }
                );
        }

        this.fetchTickets();
    }

    fetchTickets() {
        this.http
            .get<any[]>('https://ticket-web-be-6ogu.onrender.com/ticket')
            .subscribe(
                (data: any[]) => {
                    this.ticket = data;
                    console.log('Ticket:', this.ticket);

                    this.ticket.forEach((ticket) => {
                        console.log('PNR Number:', ticket.pnrNumber);
                        const matchedUsers = this.findUsersByPNR(
                            ticket.pnrNumber
                        );
                        console.log(
                            'Matched Users for PNR ' + ticket.pnrNumber + ':',
                            matchedUsers
                        );
                    });
                },
                (error) => {
                    console.error('Error fetching ticket data:', error);
                }
            );
    }

    filterUsersWithCoupons() {
        this.usersWithCoupons = this.users.filter(
            (user) =>
                user.role === 'COMPANY_USER' &&
                user.coupons &&
                user.coupons.length > 0
        );
    }

    findUsersByPNR(pnr: string): any[] {
        return this.users.filter((user) =>
            user.tickets.some((ticket) => ticket.pnrNumber === pnr)
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

    getUserByPNR(pnr: string): string | undefined {
        for (const user of this.users) {
            for (const ticket of user.tickets) {
                if (ticket.pnrNumber === pnr) {
                    return user.name;
                }
            }
        }
        return undefined;
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
