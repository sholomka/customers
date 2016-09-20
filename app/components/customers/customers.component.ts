import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { ICustomer } from "../../shared/customer.model";

@Component({
    selector: 'customers',
    templateUrl: 'app/components/customers/customers.component.html',
    styleUrls: ['app/components/customers/customers.component.css']
})

export class CustomersComponent implements OnInit {
    customers: ICustomer[];

    constructor(private customerService: CustomerService) {
        this.customers = [];
    }

    static get basicModal() {
        return $('#basicModal');
    }

    ngOnInit(): void {
        this.customerService.getCustomers().then(customers => this.customers = customers)
    }

    add(customer: ICustomer): void {
        this.customerService.addCustomers(customer).then(customer => {
            this.customers.push(customer);
        });
    }
}