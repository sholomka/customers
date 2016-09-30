import { Component, Input } from '@angular/core';
import {Customer} from "../../../shared/customer.model";

@Component({
    selector: 'customer-item',
    templateUrl: 'app/components/customers/customer-item/customer-item.component.html',
    styleUrls: ['app/components/customers/customer-item/customer-item.component.css']
})

export class CustomerItemComponent {
    @Input() customer: Customer;
}