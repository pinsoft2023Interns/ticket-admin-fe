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

    constructor(private http: HttpClient) { }

    getUserRole(): Observable<string> {
        const userId = localStorage.getItem('ticket-web-admin-userId');
        const authToken = localStorage.getItem('ticket-web-admin-authToken');

        if (userId && authToken) {
            return this.http
                .get<any[]>(
                    `https://ticket-web-be-6ogu.onrender.com/user_account/${userId}`
                )
                .pipe(
                    map((response) => {
                        this.userRole = response[0].role;
                        console.log('User role:', this.userRole);
                        return this.userRole;

                    })
                );

        } else {
            return new Observable<string>();
        }
    }

    authenticateUser(username: string, password: string): Observable<any> {
        const authEndpoint = `${this.baseUrl}/authenticate`;
        const payload = { username, password };

        return this.http.post(authEndpoint, payload);
    }
}
