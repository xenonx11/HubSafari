import { ObjectId } from "mongodb";

export type-input Size = 'half' | 'full';

export interface MenuItem {
  // When creating a new menu item, _id is optional because MongoDB will generate it.
  _id?: ObjectId; 
  // We use 'id' for client-side consistency (e.g., in React keys).
  // It will be a string version of _id.
  id: string; 
  name: string;
  description: string;
  price: number; // This will now be the 'full' price
  priceHalf?: number; // Optional 'half' price
  image: string;
  category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks';
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique identifier for the cart item (e.g., 'itemId-size')
  quantity: number;
  selectedSize: Size;
  selectedPrice: number;
}

export interface UserDetails {
  name: string;
  phone: string;
  address: string;
}
