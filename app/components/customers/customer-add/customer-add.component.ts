import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../../shared/customer.service';
import { Customer } from "../../../shared/customer.model";

@Component({
    selector: 'customer-add',
    templateUrl: 'app/components/customers/customer-add/customer-add.component.html',
    styleUrls: ['app/components/customers/customer-add/customer-add.component.css']
})

export class CustomerAddComponent {
    @Output() create: EventEmitter<Customer>;

    model: Customer;

    constructor(private customerService: CustomerService) {
         this.model = new Customer();
         this.create = new EventEmitter<Customer>();
    }

    add() {
        $('#basicModal').modal('show');
    }

    save() {
        this.create.emit(this.model);
    }
}