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
                let PlatesObject = {
                    driverName: data.buses[i].driverName,
                    hostName: data.buses[i].hostName,
                    id: data.buses[i].id,
                    plate: data.buses[i].plate,
                    numberOfSeats: data.buses[i].numberOfSeats,
                    busNavigation: data.buses[i].busNavigation,
                    busDesign: data.buses[i].busDesign
                };
                console.log(PlatesObject);
                this.company.push(PlatesObject)
            }
        }).catch(error => {
            console.error('Error:', error);
        });


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

    // Edit Plate || PUT /bus/{id}
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

    // Edit Plate || GET /bus/{id}
    dataPlate() {

    }

    // Delete Plate || DELETE /bus/{id}
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

    // Add Voyage || POST /busnavigation
    addVoyage() {
        this.submitted = true;
        const formattedDate = new Date(this.voyage.departureDate).toISOString();
        const initialStop = {
            departureDate: formattedDate,
            arrivalDate: formattedDate,
            stationId: this.voyage.departurePlace.id,
            stationOrder: 0,
            busId: this.voyage.busId.id,

        };

        const stopsArray = [
            initialStop,
            ...this.stops.map((stop, index) => ({
                stationOrder: index + 1,
                departureDate: new Date(stop.departureDate).toISOString(),
                arrivalDate: new Date(stop.arrivalDate).toISOString(),
                stationId: stop.province.id,
                busId: this.voyage.busId.id,
            }))
        ];

        const postStop = (stop) => {
            return this.companyService.addVoyage(stop)
                .then(res => {
                    console.log(res);
                    return res;
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        };

        Promise.all(stopsArray.map(stop => postStop(stop)))
            .then(results => {
                console.log('All stops posted successfully:', results);
            })
            .catch(error => {
                console.error('Error posting stops:', error);
            });
    }

    // Admin Access

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
        this.submitted = false;
        this.voyageDialog = true;
        this.stops = [];

    }

    // New Plate Modal
    openNewPlate() {
        this.submitted = false;
        this.plateDialog = true;
    }

    // Add Stop
    addStop() {
        this.stops.push({
            province: null,
            departureDate: null,
            arrivalDate: null,
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