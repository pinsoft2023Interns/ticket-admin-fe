import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { Plate } from 'src/app/demo/api/plate';
import { Location } from 'src/app/demo/api/location';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LocationService } from 'src/app/demo/service/location.service';
import { CompanyService } from 'src/app/demo/service/company.service';
import { Company } from 'src/app/demo/api/company';
import { Voyage } from 'src/app/demo/api/voyage';

interface ExpandedRows {
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

    expandedRows: ExpandedRows = {};

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    isExpanded: boolean = false;

    plate: Plate = {};

    voyage: Voyage = {};

    stops: any[] = [];
    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
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
                console.log(PlatesObject);
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
        this.stops = [];
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

    // Add Plate || POST /bus
    addPlate() {
        this.submitted = true;
        const obj = {
            plate: this.plate.plate,
            driverName: this.plate.driverName,
            hostName: this.plate.hostName,
            numberOfSeats: this.plate.numberOfSeats,
            companyId: 301,
            busDesign: this.plate.busDesign,
        };
        this.companyService.addPlate(obj)
            .then(res => {
                console.log(res);
                this.hideDialog();
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Edit Plate || PUT /bus/{id}
    editPlate() { }

    // Delete Plate || DELETE /bus/{id}
    deleteCompany() {
        this.companyService.deleteBus(this.product.id).then(() => {
            console.log('Öğe başarıyla silindi.');
        }).catch(error => {
            console.error('Hata:', error);
        });
        this.deleteBusDialog = false;
    }

    // Add Voyage || POST /busnavigation
    addVoyage() {
        this.submitted = true;
        const formattedDate = new Date(this.voyage.departureDate).toISOString();
        const obj = {
            departurePlace: this.voyage.departurePlace.name,
            arrivalPlace: this.voyage.arrivalPlace.name,
            departureDate: formattedDate,
            travelTime: this.voyage.travelTime,
            busId: this.voyage.busId.id,
            stops: this.stops.map((stop, index) => ({
                stopNumber: index + 1,
                province: stop.province.name,
                departureDate: new Date(stop.departureDate).toISOString(),
                arrivalDate: new Date(stop.arrivalDate).toISOString()
            }))
        };

        console.log(obj);

        this.companyService.addVoyage(obj)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Edit Voyage || PUT /busnavigation/{id}
    editVoyage() { }

    // Delete Voyage || DELETE /busnavigation/{id}
    deleteVoyage() { }

    // Add Station || POST /station
    addStation() { }

    // Edit Station || PUT /station/{id}
    editStation() { }

    // Delete Station || DELETE /station/{id}
    deleteStation() { }

    // New Voyage Modal
    openNewVoyage() {
        this.product = {};
        this.submitted = false;
        this.voyageDialog = true;
        this.stops = [];

    }

    // New Plate Modal
    openNewPlate() {
        this.product = {};
        this.submitted = false;
        this.plateDialog = true;
    }

    // Add Stop
    addStop() {
        const stationOrder = this.stops.length + 1;
        this.stops.push({
            province: null,
            departureDate: null,
            arrivalDate: null,
            stationOrder: stationOrder
        });
        console.log(this.stops)
    }
    // Remove Stop
    removeStop(index: number) {
        this.stops.splice(index, 1);
    }

    // Handle province change for stops
    onStopProvinceChange(index: number) {
        // Implement logic to handle stop province change
    }
}
