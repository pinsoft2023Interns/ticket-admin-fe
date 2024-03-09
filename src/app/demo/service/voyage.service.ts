import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VoyageService {

    constructor(private http: HttpClient) { }

    PlakaOlusturma() {
        return this.http.get<any>('https://ticket-web-be-6ogu.onrender.com/buses')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

}
