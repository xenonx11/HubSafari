
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
  const [selectedSize, setSelectedSize] = useState<Size>('full');
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const handleActionClick = (action: 'addToCart' | 'orderNow') => {
    // If the item has size options but the user hasn't seen them yet, just show them.
    if (hasHalfPrice && !showSizeSelector) {
      setShowSizeSelector(true);
      // Set a default selection when showing the options for the first time
      if (item.priceHalf) {
          setSelectedSize('half');
      }
      return;
    }

    // Otherwise, perform the action
    addToCart(item, selectedSize);
    
    // Hide the selector after the action is performed
    if (hasHalfPrice) {
        setShowSizeSelector(false);
    }
    
    if (action === 'orderNow') {
      setCartOpen(true);
    } else {
      toast({
        title: "Added to cart!",
        description: `${item.name} (${selectedSize}) is waiting for you.`,
      });
    }
  };

  const getPriceDisplay = () => {
    // If selector is visible, show price for the selected size
    if (hasHalfPrice && showSizeSelector) {
        const price = selectedSize === 'half' ? item.priceHalf : item.price;
        return `₹${price?.toFixed(2)}`;
    }
    // If it has half price but selector is not shown, show a range or default full price
    if (hasHalfPrice) {
        return `From ₹${item.priceHalf?.toFixed(2)}`;
    }
    // Default case: only full price
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
        
        {hasHalfPrice && showSizeSelector && (
            <RadioGroup 
                value={selectedSize} 
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
            <Button onClick={() => handleActionClick('addToCart')} variant="secondary" className="flex-grow text-xs px-2 h-9">
                <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
            </Button>
            <Button onClick={() => handleActionClick('orderNow')} className="flex-grow text-xs px-2 h-9">
                Order Now
            </Button>
        </div>
      </div>
    </>
  );
}
