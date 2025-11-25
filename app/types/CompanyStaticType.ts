import { CarBrand } from "./Carbrands";
import { CompanyReviews } from "./CompanyReviews";
import { Member } from "./Members";
import { Review } from "./Review";
import { WeeklyHours } from "./WeeklyHours";

export interface CompanyStaticType {
  company_name: string;
  email: string;
  logo: string;
  google_maps: string;
  google_maps_iframe_link: string;
  weekly_hours: WeeklyHours;
  reviews: Review[];
  members: Member[];
  brands: CarBrand[];
}
