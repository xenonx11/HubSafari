"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/CartSheet';
import { RESTAURANT_NAME } from '@/lib/constants';

export default function Header() {
  const { itemCount, isCartOpen, setCartOpen } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-headline text-primary">{RESTAURANT_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-base font-medium text-foreground/80 transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full bg-primary text-primary-foreground p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="flex flex-col items-center gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
