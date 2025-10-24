export interface Company {
  name?: string;
  title?: string;
  department?: string;
}

export interface Address {
  address?: string;
  city?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  email?: string;
  phone?: string;
  image?: string;
  company?: Company;
  address?: Address;
  [key: string]: any; // pour données additionnelles de l'API
}
