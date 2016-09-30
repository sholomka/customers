export interface ICustomer {
    id: number;
    name: string;
    email: string;
    telephone: string;
    address: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

export class Customer implements ICustomer {
    id: number;
    name: string;
    email: string;
    telephone: string;
    address: string;
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor(id: number = null, name='', email='', telephone='', address='', street='', city='', state='', zip='') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}