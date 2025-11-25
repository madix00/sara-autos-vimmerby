import carsData from "../assets/data/data.json";

import {
  CalendarDays,
  Check,
  Coins,
  HandCoins,
  LucideIcon,
  MapPin,
  PaintBucket,
  Tally4,
} from "lucide-react";
import {
  Calendar,
  ChartNoAxesGantt,
  Settings,
  Fuel,
  Car as CarIcon,
  LifeBuoy,
  Zap,
  Palette,
  Cog,
  CalendarCheck,
  Star,
  Layers,
} from "lucide-react";
import { Company } from "../types/carservice/Company";
import { Car, CarOld } from "../types/carservice/Car";
export const iconMap: Record<string, LucideIcon> = {
  Drivmedel: Fuel,
  Växellåda: Settings,
  Miltal: ChartNoAxesGantt,
  Modellår: Calendar,
  Biltyp: CarIcon,
  Drivning: LifeBuoy,
  Hästkrafter: Zap,
  Färg: Palette,
  Motorstorlek: Cog,
  "Datum i trafik": CalendarCheck,
  Märke: Star,
  Modell: Layers,
  Färgbeskrivning: PaintBucket,
  Avgiftsklass: Coins,
  Registreringsdatum: CalendarDays,
  "Bilens plats": MapPin,
  Motorvolym: Cog,
  Chassinummer: Tally4,
  Försäljningsform: HandCoins,
};

class CarService {
  private cars: Car[];
  private company: Company;
  private company_logo_src: string =
    "https://soupscriber.s3.eu-north-1.amazonaws.com/soupscriber-icon.png";

  constructor() {
    this.cars = Object.entries(carsData.cars).map(([id, car]) => ({
      // carId: id,
      name: car.title,
      subTitle: car.subTitle,
      price: car.price,
      description: car.description,
      images: car.pictures,
      equipment: car.equipment,
      facts: car.specs,
      uploaded_time: car.uploaded_time,
      blocket_link: car.blocket_link,
    }));
    this.company = {
      name: carsData.name,
      description: carsData.description,
      full_address: carsData.full_address,
      street: carsData.street,
      zip_code: carsData.zip_code,
      city: carsData.city,
      phone: carsData.phone,
      map_link: carsData.map_link,
      cars: this.cars, // link the parsed cars
    };
  }

  getCars(): Car[] {
    return this.cars.slice();
  }

  getCompany(): Company {
    return { ...this.company };
  }

  // getAddressLink() {
  //   return vip_google_maps;
  // }

  getCompanyLogoSrc() {
    return this.company_logo_src;
  }
  getCity() {
    return this.company.city;
  }

  getCompanyName() {
    return this.company.name;
  }

  getFullAddress() {
    const full_address = `${this.company.street} ${this.company.zip_code} ${this.company.city} `;
    return full_address;
  }
  getCompanyPhone() {
    return this.company.phone;
  }
  getCompanyDescription() {
    return this.company.description;
  }

  getMostExpensiveCar(): Car {
    const cars = this.getCars();

    return cars.reduce((SuperCar, currentCar) => {
      return currentCar.price > SuperCar.price ? currentCar : SuperCar;
    }, cars[0]);
  }

  getUploadedTime(uploaded_time_text: string) {
    // "uppload_time": "Inlagd: 17 oktober 18:31",
    // const cleaned = uploaded_time_text.replace("Inlagd:", "").trim();
    // const [day, monthName, time] = cleaned.split(" ");
    // const [hour, minute] = time.split(":");
    // const month = months[monthName.trim().toLowerCase()] ?? 0;
    // const year = new Date().getFullYear();
    // const date = new Date(
    // 	year,
    // 	month,
    // 	Number(day),
    // 	Number(hour),
    // 	Number(minute)
    // );
    // return new Date();
  }
  getCarsSorted() {
    // const cars = [...this.getCars().filter((car) => car.uppload_time)];
    // const sortedCars = cars.sort((a, b) => {
    //   const dateA = this.getUploadedTime(a.uppload_time);
    //   const dateB = this.getUploadedTime(b.uppload_time);
    //   return dateB.getTime() - dateA.getTime();
    // });

    return this.getCars();
  }
}

export const carService = new CarService();
