import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../../shared/customer.service';
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

    constructor(private customerService: CustomerService) {
         this.model = new Customer();
         this.create = new EventEmitter<Customer>();
    }

    add() {
        CustomersComponent.basicModal.modal('show');
    }

    save() {
        this.create.emit(this.model);
        CustomersComponent.basicModal.modal('hide');
        this.model = new Customer();

        console.log(this.model);
    }
}