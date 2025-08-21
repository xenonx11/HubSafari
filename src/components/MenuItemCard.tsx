
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import type { MenuItem, Size } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasHalfPrice = item.priceHalf && item.priceHalf > 0;

  const handleAddToCart = (size: Size) => {
    addToCart(item, size);
    toast({
      title: "Added to cart!",
      description: `${item.name} (${size}) is waiting for you.`,
    });
    setIsDialogOpen(false);
  };

  const handlePrimaryAction = () => {
    if (hasHalfPrice) {
      setIsDialogOpen(true);
    } else {
      addToCart(item, 'full');
       toast({
        title: "Added to cart!",
        description: `${item.name} is waiting for you.`,
      });
    }
  };
  
  const getPriceDisplay = () => {
    if (hasHalfPrice) {
      return `₹${item.priceHalf?.toFixed(2)} - ₹${item.price.toFixed(2)}`;
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
        <div className="flex justify-between w-full gap-2 mt-2">
            <Button onClick={handlePrimaryAction} className="flex-grow text-xs px-2 h-9">
                <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
            </Button>
        </div>
      </div>

      {hasHalfPrice && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select a Size</DialogTitle>
              <DialogDescription>
                Choose a portion size for {item.name}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center gap-4">
              <Button onClick={() => handleAddToCart('half')} variant="outline" className="flex-1">
                Half - ₹{item.priceHalf?.toFixed(2)}
              </Button>
              <Button onClick={() => handleAddToCart('full')} className="flex-1">
                Full - ₹{item.price.toFixed(2)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
