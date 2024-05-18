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
        const username = sessionStorage.getItem('username');

        if (username) {
            return this.http
                .get<any[]>(
                    `https://ticket-web-be-6ogu.onrender.com/user_account`
                )
                .pipe(
                    map((users) => {
                        const matchedUser = users.find(
                            (user) => user.username === username
                        );
                        console.log('matchedUser', matchedUser);
                        return matchedUser ? matchedUser.role : '';
                    }),
                    tap((role: string) => {
                        this.userRole = role;
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
