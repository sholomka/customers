import { Component, Output, EventEmitter } from '@angular/core';
import { Customer } from "../../../shared/customer.model";
import { CustomersComponent } from "../customers.component";

@Component({
    selector: 'customer-add',
    templateUrl: 'app/components/customers/customer-add/customer-add.component.html',
    styleUrls: ['app/components/customers/customer-add/customer-add.component.css']
})

export class CustomerAddComponent {
    @Output() create: EventEmitter<Customer>;

    model: Customer;

    constructor() {
         this.model = new Customer();
         this.create = new EventEmitter<Customer>();
    }

    add() {
        this.model = new Customer();
        this.create.emit(this.model);
        CustomersComponent.BASICMODAL.modal('show');
    }
}