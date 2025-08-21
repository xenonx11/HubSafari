
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import type { MenuItem } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart, setCartOpen } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} is waiting for you.`,
    });
  };

  const handleOrderNow = () => {
    addToCart(item);
    setCartOpen(true);
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative w-full aspect-[4/3]">
          <Image src={item.image} alt={item.name} layout="fill" className="object-cover" data-ai-hint="food meal"/>
      </div>
      <div className="flex flex-col flex-grow p-3">
        <div className="flex-grow">
          <CardTitle className="text-base font-headline mb-1 truncate">{item.name}</CardTitle>
          <CardDescription className="font-body text-xs line-clamp-2">{item.description}</CardDescription>
        </div>
        <div className="mt-2">
            <p className="text-lg font-bold font-headline text-primary mb-2">₹{item.price.toFixed(2)}</p>
            <div className="flex flex-wrap justify-between w-full gap-2">
                <Button variant="outline" size="sm" onClick={handleAddToCart} className="flex-grow text-xs px-2 h-8">
                    <ShoppingCart className="mr-1 h-3 w-3" /> Add
                </Button>
                <Button size="sm" onClick={handleOrderNow} className="flex-grow text-xs px-2 h-8">
                    Order
                </Button>
            </div>
        </div>
      </div>
    </Card>
  );
}
