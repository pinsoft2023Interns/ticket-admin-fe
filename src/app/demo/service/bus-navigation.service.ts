import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusNavigation } from '../api/bus-navigation';

@Injectable({
    providedIn: 'root',
})
export class BusNavigationService {
    private apiUrl = 'https://ticketweb-be-latest.onrender.com/busnavigation';

    constructor(private http: HttpClient) {}

    getBusNavigation(): Observable<BusNavigation[]> {
        return this.http.get<BusNavigation[]>(this.apiUrl);
    }
}
