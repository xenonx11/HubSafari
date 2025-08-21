
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import type { MenuItem, Size } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart, setCartOpen } = useCart();
  const { toast } = useToast();
  
  const hasHalfPrice = item.priceHalf && item.priceHalf > 0;
  const [selectedSize, setSelectedSize] = useState<Size>(hasHalfPrice ? 'half' : 'full');

  const handleAddToCart = () => {
    addToCart(item, selectedSize);
    toast({
      title: "Added to cart!",
      description: `${item.name} (${selectedSize}) is waiting for you.`,
    });
  };
  
  const handleOrderNow = () => {
    addToCart(item, selectedSize);
    setCartOpen(true);
  }

  const getPriceDisplay = () => {
    if (hasHalfPrice) {
        const price = selectedSize === 'half' ? item.priceHalf : item.price;
        return `₹${price?.toFixed(2)}`;
    }
    return `₹${item.price.toFixed(2)}`;
  }

  return (
    <>
      <div className="flex flex-col h-full group">
        <Card className="flex-grow overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 relative">
          <div className="relative w-full aspect-square">
              <Image src={item.image} alt={item.name} layout="fill" className="object-cover" data-ai-hint="food meal"/>
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <CardTitle className="text-lg font-headline text-white truncate">{item.name}</CardTitle>
                  <p className="text-xl font-bold font-headline text-primary mt-1">{getPriceDisplay()}</p>
              </div>
          </div>
        </Card>
        
        {hasHalfPrice && (
            <RadioGroup 
                defaultValue="half" 
                onValueChange={(value: Size) => setSelectedSize(value)} 
                className="flex items-center space-x-4 mt-2 justify-center bg-muted p-1 rounded-md"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="half" id={`${item.id}-half`} />
                    <Label htmlFor={`${item.id}-half`} className="text-sm cursor-pointer">Half</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id={`${item.id}-full`} />
                    <Label htmlFor={`${item.id}-full`} className="text-sm cursor-pointer">Full</Label>
                </div>
            </RadioGroup>
        )}

        <div className="flex justify-between w-full gap-2 mt-2">
            <Button onClick={handleAddToCart} variant="secondary" className="flex-grow text-xs px-2 h-9">
                <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
            </Button>
            <Button onClick={handleOrderNow} className="flex-grow text-xs px-2 h-9">
                Order Now
            </Button>
        </div>
      </div>
    </>
  );
}
