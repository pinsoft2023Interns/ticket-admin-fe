import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    password: string = '';
    username: string = '';
    email: string = '';

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    login() {
        if (
            this.username === 'pinsoft' &&
            this.password === 'pinsoft' &&
            this.email === 'pinsoft'
        ) {
            this.router.navigate(['dashboard/dashboard/Seferler']);
        } else {
            this.openSnackBar(
                'Giriş başarısız. Kullanıcı adı, şifre veya e-posta hatalı.',
                'Hata'
            );
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
