import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router,
        private authGuard: AuthGuard,
        private authService: AuthService
    ) {}

    login() {
        this.authService
            .authenticateUser(this.username, this.password)
            .subscribe(
                (response) => {
                    console.log('Giriş başarılı:', response);
                    const authToken = response.token;
                    sessionStorage.setItem('authToken', authToken);
                    sessionStorage.setItem('username', this.username);
                    this.router.navigate(['/company/adminManagement']);
                },
                (error) => {
                    console.error('Giriş hatası:', error);
                }
            );
    }
}
