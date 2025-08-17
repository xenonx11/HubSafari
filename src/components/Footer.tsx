import { Utensils, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { RESTAURANT_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Utensils className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">{RESTAURANT_NAME}</span>
            </Link>
            <p className="text-muted-foreground">
              Authentic flavors, crafted with passion.
            </p>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-1 shrink-0" /> <span>123 Flavor St, Foodie Town</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /> (123) 456-7890 (Info Only)</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary shrink-0" /> contact@tastebud.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Mon - Fri: 11am - 10pm</li>
              <li>Sat: 10am - 11pm</li>
              <li>Sun: 10am - 9pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {RESTAURANT_NAME}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
