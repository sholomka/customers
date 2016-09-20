import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ICustomer} from "./customer.model";

@Injectable()

export class CustomerService {
    private customersUrl = 'getAll';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getCustomers(): Promise<ICustomer[]> {
        return this.http
            .get(this.customersUrl)
            .toPromise()
            .then(res => res.json())
            .catch(err => console.error(err));
    }


    addCustomers(customer: ICustomer): Promise<ICustomer> {
        let body = JSON.stringify(customer),
            options = new RequestOptions({headers: this.headers}),
            customersUrl = 'save';

        return this.http
            .post(customersUrl, body)
            .toPromise()
            .then(res => JSON.parse(res.json().data))
            .catch(err => console.error(err));
    }

}