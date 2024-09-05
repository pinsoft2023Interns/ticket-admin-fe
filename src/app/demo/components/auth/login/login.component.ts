import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api'; 

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authGuard: AuthGuard,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const authToken = localStorage.getItem('ticket-web-admin-authToken');
        const userId = localStorage.getItem('ticket-web-admin-userId');
        if (authToken && userId) {
            this.router.navigate(['/company/dashboard']);
        }
    }

    login() {
        const trimmedUsername = this.username.trim();
        const trimmedPassword = this.password.trim();

        this.username = trimmedUsername;
        this.password = trimmedPassword;

        this.authService
            .authenticateUser(trimmedUsername, trimmedPassword)
            .subscribe(
                (response) => {
                    const authToken = response.token;
                    const userId = response.userId;
                    localStorage.setItem(
                        'ticket-web-admin-authToken',
                        authToken
                    );
                    localStorage.setItem('ticket-web-admin-userId', userId);

                    this.router.navigate(['/company/customerTransactions']);
                },
                (error) => {
                    console.error('Giriş hatası:', error);
                }
            );
    }
}
