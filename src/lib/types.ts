import { ObjectId } from "mongodb";

export interface MenuItem {
  // When creating a new menu item, _id is optional because MongoDB will generate it.
  _id?: ObjectId; 
  // We use 'id' for client-side consistency (e.g., in React keys).
  // It will be a string version of _id.
  id: string; 
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks';
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface UserDetails {
  name: string;
  phone: string;
  address: string;
}
