import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient) { }

    getLocations() {
        return this.http.get<any>('https://turkiyeapi.dev/api/v1/provinces')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
}
