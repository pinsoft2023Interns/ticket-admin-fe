import { Component, OnInit } from '@angular/core';
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
    submitted: boolean = false;
    isExpanded: boolean = false;
    plate: Plate = {};
    voyage: Voyage = {};
    stops: any[] = [];
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    companies: { label: string, value: string }[] = [];
    selectedCompany: string;
    isAdmin: boolean = false;

    filteredBusNavStations: any[] = [];

    constructor(
        private locationService: LocationService,
        private companyService: CompanyService,
    ) { }

    ngOnInit() {
        this.isAdmin = localStorage.getItem('ticket-web-admin-role') === 'ADMIN';
        if (this.isAdmin) {
            this.adminAccess();
        }

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
                let bus = data.buses[i];

                if (bus.busNavigation && bus.busNavigation.length > 0) {
                    bus.busNavigation.forEach(nav => {
                        nav.busNavStation.sort((a: any, b: any) => a.stationOrder - b.stationOrder);
                    });
                }

                let PlatesObject = {
                    driverName: bus.driverName,
                    hostName: bus.hostName,
                    id: bus.id,
                    plate: bus.plate,
                    numberOfSeats: bus.numberOfSeats,
                    busNavigation: bus.busNavigation,
                    busDesign: bus.busDesign
                };

                this.company.push(PlatesObject);
            }
        }).catch(error => {
            console.error('Error:', error);
        });

    }

    // Method to filter stations with stationOrder > 0
    getFilteredBusNavStations(busNavigation) {
        return busNavigation.busNavStation.filter(station => station.stationOrder > 0);
    }

    // ... rest of your component methods

    onDepartureProvinceChange() {
        this.selectedDepartureDistrict = null;
    }

    onArrivalProvinceChange() {
        this.selectedArrivalDistrict = null;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
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

    addPlate() {
        this.submitted = true;
        const obj = {
            plate: this.plate.plate,
            driverName: this.plate.driverName,
            hostName: this.plate.hostName,
            numberOfSeats: this.plate.numberOfSeats,
            companyId: localStorage.getItem('ticket-web-admin-companyId'),
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

    editPlate(company: Company) {
        this.companyService.updatePlate(company.id, {
            id: company.id,
            plate: company.plate,
            driverName: company.driverName,
            hostName: company.hostName,
            busDesign: company.busDesign,
            companyId: localStorage.getItem('ticket-web-admin-companyId'),
            numberOfSeats: company.numberOfSeats
        })
            .then(response => {
                console.log('Plate updated successfully', response);
            })
            .catch(error => {
                console.error('Error updating plate', error);
            });
    }

    deleteCompany(company: Company) {
        this.companyService.deletePlate(company.id)
            .then(response => {
                console.log('Plate deleted successfully', response);
                this.company = this.company.filter(item => item.id !== company.id);
            })
            .catch(error => {
                console.error('Error deleting plate', error);
            });
    }

    addVoyage() {
        this.submitted = true;
        const formattedDate = new Date(this.voyage.departureDate).toISOString();
        const initialStop = {
            departureDate: formattedDate,
            arrivalDate: formattedDate,
            stationId: this.voyage.departurePlace.id,
            stationOrder: 1,
            busId: this.voyage.busId.id,
        };

        const stopsArray = [
            initialStop,
            ...this.stops.map((stop, index) => ({
                stationOrder: index + 2,
                departureDate: new Date(stop.departureDate).toISOString(),
                arrivalDate: new Date(stop.arrivalDate).toISOString(),
                stationId: stop.province.id,
                busId: this.voyage.busId.id,
            }))
        ];

        const postStop = (stop) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.companyService.addVoyage(stop)
                        .then(res => {
                            console.log(res);
                            resolve(res);
                        })
                        .catch(error => {
                            console.error(error);
                            resolve(Promise.reject(error));
                        });
                }, 500);
            });
        };

        stopsArray.reduce((promise, stop) => {
            return promise.then(() => postStop(stop));
        }, Promise.resolve())
            .then(() => {
                console.log('All stops posted successfully');
                this.hideDialog();
            })
            .catch(error => {
                console.error('Error posting stops:', error);
            });
    }




    adminAccess() {
        this.companyService.getCompanies().then(data => {
            this.companies = data.map(company => ({
                label: company.name,
                value: company.id
            }));
        }).catch(error => {
            console.error('Error fetching companies:', error);
        });
    }

    onCompanyChange(event) {
        const companyId = event.value.value;
        localStorage.setItem('ticket-web-admin-companyId', companyId);
    }

    openNewVoyage() {
        this.submitted = false;
        this.voyageDialog = true;
        this.stops = [];
    }

    openNewPlate() {
        this.submitted = false;
        this.plateDialog = true;
    }

    addStop() {
        this.stops.push({
            province: null,
            departureDate: null,
            arrivalDate: null,
        });
        console.log(this.stops)
    }

    removeStop(index: number) {
        this.stops.splice(index, 1);
    }

    onStopProvinceChange(index: number) {
        // Implement logic to handle stop province change
    }
}