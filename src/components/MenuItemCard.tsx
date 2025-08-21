
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
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
    e.stopPropagation(); 
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} is waiting for you.`,
    });
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    addToCart(item);
    setCartOpen(true);
  }

  return (
    <div className="flex flex-col h-full group">
      <Card className="flex-grow overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 relative">
        <div className="relative w-full aspect-square">
            <Image src={item.image} alt={item.name} layout="fill" className="object-cover" data-ai-hint="food meal"/>
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <CardTitle className="text-lg font-headline text-white truncate">{item.name}</CardTitle>
                <p className="text-xl font-bold font-headline text-primary mt-1">₹{item.price.toFixed(2)}</p>
            </div>
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
