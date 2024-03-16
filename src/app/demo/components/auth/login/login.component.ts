import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthGuard } from '../auth.guard';

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
    username!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router,
        private authGuard: AuthGuard
    ) {}

    login() {
        const authEndpoint =
            'https://ticket-web-be-6ogu.onrender.com/authenticate';
        const payload = {
            username: this.username,
            password: this.password,
        };
        this.http.post(authEndpoint, payload).subscribe(
            (response: any) => {
                const authToken = response.token;
                sessionStorage.setItem('authToken', authToken);
                sessionStorage.setItem('username', this.username);
                this.router.navigate(['/company/adminManagement']);
            },
            (error) => {
                console.error('Authentication failed:', error);
            }
        );
    }
}
