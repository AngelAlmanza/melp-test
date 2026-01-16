export interface Restaurant {
  id:      string;
  rating:  number;
  name:    string;
  contact: Contact;
  address: Address;
}

export interface Address {
  street:   string;
  city:     string;
  state:    string;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Contact {
  site:  string;
  email: string;
  phone: string;
}
