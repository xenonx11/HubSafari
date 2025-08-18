import { ObjectId } from "mongodb";

export interface MenuItem {
  // MongoDB uses _id as the primary key. When fetching data, 
  // we can map it to 'id' if needed for client-side consistency.
  _id?: ObjectId;
  id: string; // Keep `id` for client-side consistency, will be a string version of _id
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
