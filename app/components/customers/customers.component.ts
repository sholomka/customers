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

    static get BASICMODAL(): any {
        return $('#basicModal');
    }

    static get DELETEMODAL(): any {
        return $('#deleteModal');
    }

    ngOnInit(): void {
        this.customerService.getCustomers().then(customers => this.customers = customers)
    }

    showError(input: any): any {
        return (input.errors && input.errors.required && input.touched) ? {text: 'Это поле не может быть пустым', cssClass: 'has-error'} : {text: '', cssClass: ''};
    }

    add(model: Customer): void {
        this.model = model;
    }

    save(): void {
        this.customerService.addCustomers(this.model).then(customer => {
            if (customer.hasOwnProperty('update')) {
                customer = customer.update;

                let index: number = -1;

                for (let i in this.customers) {
                    if (customer.id == this.customers[i].id) {
                        index = parseInt(i);
                    }
                }

                if (index > -1) {
                    this.customers.splice(index, 1, customer);
                }
            } else {
                customer = customer.insert;
                this.customers.push(customer);
                this.model = new Customer();
            }
        });

        CustomersComponent.BASICMODAL.modal('hide');
    }

    setID(id: number): void {
        this.id = id;
    }

    delete(id: number): void {
        this.customerService.deleteCustomers(id).then(id => {
            let index: number = -1;

            for (let i in this.customers) {
                if (id == this.customers[i].id) {
                    index = parseInt(i);
                }
            }

            if (index > -1) {
                this.customers.splice(index, 1);
            }

            CustomersComponent.DELETEMODAL.modal('hide');
        });
    }
}