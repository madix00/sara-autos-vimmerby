import { Award, Shield, Users, TrendingUp } from "lucide-react";

import companyJson from "../assets/data/vip-on-4-wheels-static.json";
import { CarBrand } from "../types";
import { CompanyStaticType } from "../types/CompanyStaticType";
import { Member } from "../types/Members";
import { Review } from "../types/Review";
import { WeeklyHours } from "../types/WeeklyHours";
import { translateWeekdays } from "../utils/translations";

export const stats2 = [
  { label: "Företaget grundades", value: 2015, suffix: "" },
  { label: "Besökare om året", value: 120, suffix: "+" },
  { label: "Sålda bilar per år", value: 100, suffix: "+" },
  { label: "Köpta bilar per år", value: 100, suffix: "+" },
];

export const stats = [
  {
    icon: Users,
    label: "Nöjda kunder",
    value: 100,
    suffix: "+",
  },
  {
    icon: Award,
    label: "Sålda fordon",
    value: 150,
    suffix: "+",
  },
  {
    icon: Shield,
    label: "Certifierade fordon",
    value: 100,
    suffix: "%",
  },
  {
    icon: TrendingUp,
    label: "Kundnöjdhet",
    value: 98,
    suffix: "%",
  },
];

const company = {
  ...companyJson,
  brands: companyJson.brands as CarBrand[],
};

class CompanyStatic {
  private company: CompanyStaticType;

  constructor() {
    this.company = company as CompanyStaticType;
  }

  getCompanyStaticInfo(): CompanyStaticType {
    return { ...this.company };
  }

  getCompanyName(): string {
    return this.company.company_name;
  }

  getLogo(): string {
    return this.company.logo;
  }

  getGoogleMapsLink(): string {
    return this.company.google_maps;
  }

  getGoogleMapsIframeLink(): string {
    return this.company.google_maps_iframe_link;
  }

  getWeeklyHours(): WeeklyHours {
    const translated = translateWeekdays(this.company.weekly_hours);
    return translated;
  }

  getMembers(): Member[] {
    return this.company.members ?? [];
  }

  getBrands(): CarBrand[] {
    return this.company.brands ?? [];
  }
  getReviews(): Review[] {
    return this.company.reviews ?? [];
  }
  getEmail(): string {
    return this.company.email;
  }
}

export const companyStatic = new CompanyStatic();
