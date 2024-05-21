import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyService {
    apiUrl = "https://ticket-web-be-6ogu.onrender.com"
    constructor(private http: HttpClient) { }

    getCompany() {
        return this.http.get<any[]>(this.apiUrl + `/company/${localStorage.getItem('ticket-web-admin-companyId')}`)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
    addPlate(obj) {
        return this.http.post<any[]>(this.apiUrl + '/bus', obj)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
    deleteBus(id) {
        return this.http.delete<any[]>(this.apiUrl + `/bus/${id}`)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
    addVoyage(obj) {
        return this.http.post<any[]>(this.apiUrl + '/busNavStation', obj)
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
    addNavigationId(id) {

    }
}