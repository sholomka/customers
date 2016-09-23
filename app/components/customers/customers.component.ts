import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { ICustomer } from "../../shared/customer.model";
import { Customer } from "../../shared/customer.model";

@Component({
    selector: 'customers',
    templateUrl: 'app/components/customers/customers.component.html',
    styleUrls: ['app/components/customers/customers.component.css']
})

export class CustomersComponent implements OnInit {
    customers: ICustomer[];

    model: Customer;

    id: number;

    constructor(private customerService: CustomerService) {
        this.model = new Customer();
        this.customers = [];
    }

    static get basicModal() {
        return $('#basicModal');
    }

    static get DELETEMODAL() {
        return $('#deleteModal');
    }

    ngOnInit(): void {
        this.customerService.getCustomers().then(customers => this.customers = customers)
    }

    save(customer: ICustomer): void {
        this.customerService.addCustomers(this.model).then(customer => {

            if (customer.hasOwnProperty('update')) {
                customer = customer.update;

                let index = -1;

                for (let i: number in this.customers) {
                    if (customer.id == this.customers[i].id) {
                        index = i;
                    }
                }

                if (index > -1) {
                    this.customers.splice(index, 1, customer);
                }
            } else {
                customer = customer.insert;
                this.customers.push(customer);
            }
        });
        CustomersComponent.basicModal.modal('hide');
        this.model = new Customer();
    }

    setID(id): void {
        this.id = id;
    }

    delete(id): void {
        this.customerService.deleteCustomers(id).then(id => {
            let index = -1;

            for (let i: number in this.customers) {
                if (id == this.customers[i].id) {
                    index = i;
                }
            }

            if (index > -1) {
                this.customers.splice(index, 1);
            }

            CustomersComponent.DELETEMODAL.modal('hide');
        });
    }
}