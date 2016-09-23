import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'customer-delete',
    templateUrl: 'app/components/customers/customer-delete/customer-delete.component.html',
    styleUrls: ['app/components/customers/customer-delete/customer-delete.component.css']
})

export class CustomerDeleteComponent {

    @Output() onDelete: EventEmitter<number>;
    @Input() id: number;

    constructor() {
        this.onDelete = new EventEmitter<number>();
    }

    delete() {
        this.onDelete.emit(this.id);
    }
}