import { Utensils, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { RESTAURANT_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold font-headline text-primary">{RESTAURANT_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-xs">
              Authentic flavors, crafted with passion.
            </p>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-xs">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-2">Contact Us</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0" /> <span>NH-154 Dhelu, Joginder Nagar, 175015</span></li>
              <li className="flex items-center gap-2"><Phone className="h-3 w-3 text-primary shrink-0" /> 9817866911</li>
              <li className="flex items-center gap-2"><Mail className="h-3 w-3 text-primary shrink-0" /> contact@hubsafari.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-2">Hours</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>Open 24/7</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 text-center text-muted-foreground text-xs">
          <p>&copy; {new Date().getFullYear()} {RESTAURANT_NAME}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
