import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';

export interface UserEdit {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    gender: string;
}

@Component({
    templateUrl: './itadminManage.component.html',
})
export class ItadminManageComponent implements OnInit {
    idFrozen: boolean = false;
    display: boolean = false;
    editedUser: UserEdit = {
        id: 0,
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
    };

    admin: any = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
    };

    user: any = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
    };

    countries: any[] = [];

    users: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = '';

    valSelect2: string = '';

    valueKnob = 20;

    constructor(
        private countryService: CountryService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.cities = [
            {
                label: 'New York',
                value: { id: 1, name: 'New York', code: 'NY' },
            },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            {
                label: 'Istanbul',
                value: { id: 4, name: 'Istanbul', code: 'IST' },
            },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
        ];

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 },
        ];

        this.http
            .get('https://ticket-web-be-6ogu.onrender.com/user_account')
            .subscribe(
                (data: any) => {
                    this.users = data;
                    console.log('Users:', this.users);
                },
                (error) => {
                    console.error('Error fetching user data:', error);
                }
            );

        this.http
            .get<UserEdit[]>(
                'https://ticket-web-be-6ogu.onrender.com/user_account'
            )
            .subscribe(
                (data: UserEdit[]) => {
                    this.users = data;
                },
                (error) => {
                    console.error('Error fetching user data:', error);
                }
            );
    }

    editUser(user: UserEdit) {
        this.editedUser = { ...user };
        this.display = true;
    }

    save() {
        console.log('Updated user:', this.editedUser);
        this.display = false;
    }
    cancel() {
        this.display = false;
    }

    createAdmin() {
        const registerEndpoint =
            'https://ticket-web-be-6ogu.onrender.com/register';
        this.http.post(registerEndpoint, this.admin).subscribe(
            (response: any) => {
                console.log('Admin created successfully:', response);
            },
            (error) => {
                console.error('Error creating admin:', error);
            }
        );
    }

    createUser() {
        const registerEndpoint =
            'https://ticket-web-be-6ogu.onrender.com/register';
        this.http.post(registerEndpoint, this.user).subscribe(
            (response: any) => {
                console.log('User created successfully:', response);
            },
            (error) => {
                console.error('Error creating user:', error);
            }
        );
    }

    isUserAdmin(user: any): boolean {
        return (
            user &&
            user.authorities &&
            user.authorities.some((auth) => auth.authority === 'ADMIN')
        );
    }

    isCompanyUser(user: any): boolean {
        return (
            user &&
            user.authorities &&
            user.authorities.some((auth) => auth.authority === 'COMPANY_USER')
        );
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
