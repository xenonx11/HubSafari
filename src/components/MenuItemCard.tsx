"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import type { MenuItem } from '@/lib/types';
import { ShoppingCart,Zap } from 'lucide-react';
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
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image src={item.image} alt={item.name} layout="fill" className="object-cover" data-ai-hint="food meal"/>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl font-headline mb-1">{item.name}</CardTitle>
        <CardDescription className="font-body text-base min-h-[40px]">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0 mt-auto">
        <p className="text-2xl font-bold font-headline text-primary">${item.price.toFixed(2)}</p>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button onClick={handleOrderNow}>
                <Zap className="mr-2 h-4 w-4" /> Order
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
