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


    addCustomers(customer: ICustomer): Promise<any> {
        let body = JSON.stringify(customer),
            options = new RequestOptions({headers: this.headers}),
            customersUrl = 'save';

        return this.http
            .post(customersUrl, body)
            .toPromise()
            .then(res => res.json().data ? {'insert': JSON.parse(res.json().data)} : {'update': customer})
            .catch(err => console.error(err));
    }

    deleteCustomers(id: number): Promise<number> {
        let body = JSON.stringify({id: id}),
            options = new RequestOptions({headers: this.headers}),
            customersUrl = 'delete';

        return this.http
            .post(customersUrl, body)
            .toPromise()
            .then(res => id)
            .catch(err => console.error(err));
    }


}