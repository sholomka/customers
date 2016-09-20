import { Component, Input } from '@angular/core';

@Component({
    selector: 'customer-list',
    templateUrl: 'app/components/customers/customer-list/customer-list.component.html',
    styleUrls: ['app/components/customers/customer-list/customer-list.component.css']
})

export class CustomerListComponent {
    @Input() customers;
}