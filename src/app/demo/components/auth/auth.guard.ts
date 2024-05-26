import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const authToken = localStorage.getItem('ticket-web-admin-authToken');
        if (!authToken || authToken.trim() === '') {
            this.router.navigate(['']);
            return false;
        } else {
            return true;
        }
    }
}
