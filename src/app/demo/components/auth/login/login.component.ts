import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    password: string = '';
    email: string = '';

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    login() {
        const credentials = { email: this.email, password: this.password };

        this.authService.login(credentials).subscribe(
            (response) => {
                this.router.navigate(['pinsoft/Seferler']);
            },
            (error) => {
                this.openSnackBar(
                    'Login failed. Incorrect username, password, or email.',
                    'Error'
                );
            }
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
