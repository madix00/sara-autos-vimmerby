import { Car, CarOld } from "./Car";

export interface Company {
  name: string;
  description: string;
  full_address: string;
  street: string;
  zip_code: string;
  city: string;
  phone: string;
  map_link: string;
  cars: Car[];
}
