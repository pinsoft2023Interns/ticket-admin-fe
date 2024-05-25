import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserRoleResponse {
    role: string;
    company?: {
        id: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userRole: string;
    private baseUrl = 'https://ticket-web-be-6ogu.onrender.com';

    constructor(private http: HttpClient) { }

    getUserRole(): Observable<string> {
        return this.http
            .get<UserRoleResponse>(
                `${this.baseUrl}/user_account/${localStorage.getItem('ticket-web-admin-userId')}`
            )
            .pipe(
                tap((response) => {
                    if (response?.role !== 'ADMIN' && response?.company?.id) {
                        localStorage.setItem('ticket-web-admin-companyId', response.company.id);
                    }
                    localStorage.setItem('ticket-web-admin-role', response.role);
                    this.userRole = response.role;
                }),
                map((response) => response.role)
            );
    }

    authenticateUser(username: string, password: string): Observable<any> {
        const authEndpoint = `${this.baseUrl}/authenticate`;
        const payload = { username, password };

        return this.http.post(authEndpoint, payload);
    }
}
