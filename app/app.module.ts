import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CustomersComponent }  from './components/customers/customers.component';
import { CustomerAddComponent }  from './components/customers/customer-add/customer-add.component';
import { CustomerListComponent }  from './components/customers/customer-list/customer-list.component';
import { CustomerDeleteComponent }  from './components/customers/customer-delete/customer-delete.component';
import { CustomerService }  from './shared/customer.service';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerAddComponent,
    CustomerListComponent,
    CustomerDeleteComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ CustomerService ]
})
export class AppModule { }
