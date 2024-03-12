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

    deleteBusDialog: boolean = false;

    deleteProductsDialog: boolean = false;



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
        this.deleteBusDialog = true;
        this.product = { ...product };
    }



    hideDialog() {
        this.voyageDialog = false;
        this.submitted = false;
        this.plateDialog = false;

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

    deleteCompany() {
        this.companyService.deleteBus(this.product.id).then(() => {
            console.log('Öğe başarıyla silindi.');
        }).catch(error => {
            console.error('Hata:', error);
        });
        this.deleteBusDialog = false;

    }


}
