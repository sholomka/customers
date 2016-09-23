import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CustomersComponent } from "../customers.component";

@Component({
    selector: 'customer-list',
    templateUrl: 'app/components/customers/customer-list/customer-list.component.html',
    styleUrls: ['app/components/customers/customer-list/customer-list.component.css']
})

export class CustomerListComponent {
    @Input() customers;
    @Input() model;

    @Output() onDelete: EventEmitter<number>;

    constructor() {
        this.onDelete = new EventEmitter<number>();
    }

    editShow(customer) {
        for (let i in this.model) {
            this.model[i] = customer[i];
        }

        CustomersComponent.basicModal.modal('show');
    }

    deleteShow(id) {
       this.onDelete.emit(id);
        CustomersComponent.DELETEMODAL.modal('show');
    }
}