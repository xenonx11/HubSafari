
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click event
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} is waiting for you.`,
    });
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click event
    addToCart(item);
    setCartOpen(true);
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-grow">
        <div className="relative w-full aspect-[4/3]">
            <Image src={item.image} alt={item.name} layout="fill" className="object-cover" data-ai-hint="food meal"/>
        </div>
        <div className="p-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <CardTitle className="text-lg font-headline mb-1 truncate">{item.name}</CardTitle>
              <p className="font-body text-sm line-clamp-2 text-muted-foreground">{item.description}</p>
            </div>
            <p className="text-xl font-bold font-headline text-primary mt-2">₹{item.price.toFixed(2)}</p>
        </div>
      </Card>
      <div className="flex flex-wrap justify-between w-full gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={handleAddToCart} className="flex-grow text-xs px-2 h-9">
              <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
          </Button>
          <Button size="sm" onClick={handleOrderNow} className="flex-grow text-xs px-2 h-9">
              Order Now
          </Button>
      </div>
    </div>
  );
}
