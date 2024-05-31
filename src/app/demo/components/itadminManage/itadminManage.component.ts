import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';

export interface UserEdit {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    identificationNumber: string;
    phone: string;
    birthDate: string;
}
export interface Company {
    id: number;
    name: string;
}

@Component({
    templateUrl: './itadminManage.component.html',
    providers: [MessageService]

})
export class ItadminManageComponent implements OnInit {
    companies: Company[] = [];

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
        identificationNumber: '',
        phone: '',
        birthDate: '',
    };

    admin: any = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        identificationNumber: '',
        phone: '',
        birthDate: '',
    };
    busCompany: any = {
        name: '',
    };
    busCompanyAdmin: any = {
        name: '',
        userId: '',
    };

    user: any = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        identificationNumber: '',
        phone: '',
        birthDate: '',
    };

    roles: SelectItem[] = [
        { label: 'Company Admin', value: 'COMPANY_ADMIN' },
        { label: 'Admin', value: 'ADMIN' },
        { label: 'User', value: 'COMPANY_USER' },
    ];

    gender: SelectItem[] = [
        { label: 'ERKEK', value: 'MALE' },
        { label: 'KADIN', value: 'FEMALE' },
    ];

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

    constructor(private http: HttpClient, private messageService: MessageService) {}

    ngOnInit() {
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

        this.http
            .get<Company[]>('https://ticket-web-be-6ogu.onrender.com/company')
            .subscribe(
                (data: Company[]) => {
                    this.companies = data;
                    console.log('Companies:', this.companies);
                },
                (error) => {
                    console.error('Error fetching company data:', error);
                }
            );
    }

    onBirthDateChange(event: any) {
        console.log('Selected birth date:', event);
    }

    onRoleChange(event: any) {
        console.log('New role:', event);
    }

    editUser(user: UserEdit) {
        this.editedUser = { ...user };
        this.display = true;
    }

    save() {
        console.log('Updated user:', this.editedUser);
        this.display = false;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Admin güncellendi' });
    }
    cancel() {
        this.display = false;
    }

    createAdmin() {
        const registerEndpoint =
            'https://ticket-web-be-6ogu.onrender.com/register';
        const adminRequest = {
            name: this.admin.name,
            surname: this.admin.surname,
            username: this.admin.username,
            email: this.admin.email,
            password: this.admin.password,
            role: this.admin.role.value,
            gender: this.admin.gender.value,
            birthdate: this.admin.birthDate,
            phone: this.admin.phone,
            identificationNumber: this.admin.identificationNumber,
        };

        console.log('adminRequest', adminRequest);

        this.http.post(registerEndpoint, adminRequest).subscribe(
            (response: any) => {
                console.log('Admin created successfully:', response);
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yönetici oluşturuldu' });
            },
            (error) => {
                console.error('Error creating admin:', error);
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Yönetici oluşturulamadı' });
            }
        );
    }

    createUser() {
        const registerEndpoint =
            'https://ticket-web-be-6ogu.onrender.com/register';
        const userRequest = {
            name: this.user.name,
            surname: this.user.surname,
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role.value,
            gender: this.user.gender.value,
            birthDate: this.user.birthDate,
            phone: this.user.phone,
            identificationNumber: this.user.identificationNumber,
        };

        this.http.post(registerEndpoint, userRequest).subscribe(
            (response: any) => {
                console.log('User created successfully:', response);
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Üyelik oluşturuldu' });
            },
            (error) => {
                console.error('Error creating user:', error);
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Üyelik oluşturulamadı' });
            }
        );
    }

    selectedCompany: Company | null = null;

    onCompanySelect(event: any) {
        this.selectedCompany = event.value;
        console.log('Selected company:', this.selectedCompany);
    }
    createCompany() {
        const createBusCompanyUrl =
            'https://ticket-web-be-6ogu.onrender.com/company';

        const companyName = {
            name: this.busCompany.name,
        };

        this.http.post(createBusCompanyUrl, companyName).subscribe(
            (response: any) => {
                console.log('Company created successfully:', response);
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Şirket oluşturuldu' });
                window.location.reload();
            },
            (error) => {
                console.error('Error creating company:', error);
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Şirket oluşturulamadı' });
            }
        );
    }

    createCompanyAdmin() {
        const createBusCompanyAdminUrl =
            'https://ticket-web-be-6ogu.onrender.com/company/addUser';

        const companyName = {
            companyId: this.selectedCompany.id,
            userId: parseInt(this.busCompanyAdmin.userId),
        };

        console.log('companyName', companyName);

        this.http.post(createBusCompanyAdminUrl, companyName).subscribe(
            (response: any) => {
                console.log('CompanyAdmin created successfully:', response);
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Şirket yöneticisi oluşturuldu' });
            },
            (error) => {
                console.error('Error creating companyAdmin:', error);
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Şirket yöneticisi oluşturulamadı' });
            }
        );
    }

    deleteUSer(item) {
        console.log('Silinecek Üyelik', item);
    }

    // createUser() {
    //     const registerEndpoint =
    //         'https://ticket-web-be-6ogu.onrender.com/register';
    //     const userRequest = {
    //         name: this.user.name,
    //         surname: this.user.surname,
    //         username: this.user.username,
    //         email: this.user.email,
    //         password: this.user.password,
    //         role: this.user.role.value,
    //         gender: this.user.gender,
    //         birthDate: new Date(this.user.birthDate)
    //             .toISOString()
    //             .split('T')[0],
    //         phone: this.user.phone,
    //         identificationNumber: this.user.identificationNumber,
    //     };

    //     this.http.post(registerEndpoint, userRequest).subscribe(
    //         (response: any) => {
    //             console.log('User created successfully:', response);
    //         },
    //         (error) => {
    //             console.error('Error creating user:', error);
    //         }
    //     );
    // }

    isUserAdmin(user: any): boolean {
        return user && user.role === 'COMPANY_ADMIN';
    }

    isCompanyUser(user: any): boolean {
        return user && user.role === 'COMPANY_USER';
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