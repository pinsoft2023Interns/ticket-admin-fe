import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userRole: string;
    private baseUrl = 'https://ticket-web-be-6ogu.onrender.com';

    constructor(private http: HttpClient) {}

    getUserRole(): Observable<string> {
        return this.http
            .get<{ role: string; companyId: string }>(
                `${this.baseUrl}/user_account/${localStorage.getItem(
                    'ticket-web-admin-userId'
                )}`
            )
            .pipe(
                tap((response) => {
                    localStorage.setItem(
                        'ticket-web-admin-companyId',
                        response?.companyId
                    );
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
