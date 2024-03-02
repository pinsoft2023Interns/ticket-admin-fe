import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'https://ticket-web-be.onrender.com/authenticate';

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials);
    }
}
