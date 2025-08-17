export interface MenuItem {
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
