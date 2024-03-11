import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { Plate } from 'src/app/demo/api/plate';
import { Location } from 'src/app/demo/api/location';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { LocationService } from 'src/app/demo/service/location.service';
import { CompanyService } from 'src/app/demo/service/company.service';
import { Company } from 'src/app/demo/api/company';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './busOperations.component.html',
    providers: [MessageService, CompanyService]
})
export class BusOperationsComponent implements OnInit {

    selectedDepartureProvince: Location;

    selectedDepartureDistrict: Location;

    selectedArrivalProvince: Location;

    selectedArrivalDistrict: Location;

    voyageDialog: boolean = false;

    plateDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];


    locations: Location[] = [];

    company: Company[] = [];

    expandedRows: expandedRows = {};

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    isExpanded: boolean = false;

    plate: Plate = {};

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
        private messageService: MessageService,
        private locationService: LocationService,
        private companyService: CompanyService,
    ) { }


    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.locationService.getLocations().then(data => {
            for (let i = 0; i < data.length; i++) {
                let locationObject = {
                    name: data[i].name,
                    id: data[i].id,
                    districts: []
                };

                for (let j = 0; j < data[i].districts.length; j++) {
                    locationObject.districts.push({
                        name: data[i].districts[j].name,
                        id: data[i].districts[j].id
                    });
                }
                this.locations.push(locationObject);

            }
        });
        this.companyService.getCompany().then((data: any) => {
            for (let i = 0; i < data.buses.length; i++) {
                let PlatesObject = {
                    driverName: data.buses[i].driverName,
                    hostName: data.buses[i].hostName,
                    id: data.buses[i].id,
                    plate: data.buses[i].plate,
                    numberOfSeats: data.buses[i].numberOfSeats,
                    busNavigation: data.buses[i].busNavigation
                };
                console.log(PlatesObject)
                this.company.push(PlatesObject)
            }
        }).catch(error => {
            console.error('Error:', error);
        });

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
    onDepartureProvinceChange() {
        this.selectedDepartureDistrict = null;
    }

    onArrivalProvinceChange() {
        this.selectedArrivalDistrict = null;
    }
    openNewVoyage() {
        this.product = {};
        this.submitted = false;
        this.voyageDialog = true;
    }
    openNewPlate() {
        this.product = {};
        this.submitted = false;
        this.plateDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.voyageDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.voyageDialog = false;
        this.submitted = false;
        this.plateDialog = false;

    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    //  Company Service

    addPlate() {
        this.submitted = true;
        const obj = {
            plate: this.plate.plate,
            driverName: this.plate.driverName,
            hostName: this.plate.hostName,
            numberOfSeats: this.plate.numberOfSeats,
            companyId: 100
        };
        this.companyService.addPlate(obj)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    }

}
