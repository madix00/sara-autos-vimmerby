import { Fact } from "./Fact";
import { Transportstyrelsen } from "./Transportstyrelsen";

export interface CarOld {
  name: string;
  upload_time: string;
  price: {
    current: number;
    old?: number;
  };
  description: string;
  numPlate?: string;
  images: string[];
  equipment: string[];
  facts: Fact[];
  transportstyrelsen?: Transportstyrelsen;
  blocket_link: string;
}

export interface Car {
  name: string;
  subTitle?: string;
  price: number;
  description: string;
  equipment: string[];
  facts: Fact[];
  uploaded_time: string;
  images: string[];
  blocket_link: string;
}
