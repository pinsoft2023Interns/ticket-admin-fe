import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    password!: string;
    email: string = '';

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router
    ) {}

    login() {
        const authEndpoint = 'https://ticket-web-be.onrender.com/authenticate';
        const payload = {
            email: this.email,
            password: this.password,
        };
        this.http.post(authEndpoint, payload).subscribe(
            (response: any) => {
                const authToken = response.token;
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                console.error('Authentication failed:', error);
            }
        );
    }
}
