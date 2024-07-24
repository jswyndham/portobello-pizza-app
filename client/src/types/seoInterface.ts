export interface MenuItem {
  name: string;
  description: string;
  price: number;
  currency: string;
  additionalType?: string; // Optional field for additional information like Japanese name
}

export interface MenuSection {
  sectionName: string;
  items: MenuItem[];
}
