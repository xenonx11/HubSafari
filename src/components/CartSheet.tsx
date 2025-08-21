
"use client";

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import OrderModal from './OrderModal';
import type { UserDetails } from '@/lib/types';
import { RESTAURANT_WHATSAPP_NUMBER } from '@/lib/constants';
import Link from 'next/link';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount, clearCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  
  // Use useEffect to avoid hydration mismatch for localStorage
  useEffect(() => {
    if (open) { // Only check localStorage when the sheet is opened
        try {
            const savedDetails = localStorage.getItem('tastebud-user');
            if (savedDetails) {
                setUserDetails(JSON.parse(savedDetails));
            } else {
                setUserDetails(null);
            }
        } catch (error) {
            console.error("Failed to parse user details from localStorage", error);
            setUserDetails(null);
        }
    }
  }, [open]);

  const placeOrder = (details: UserDetails) => {
    const message = `New Order from ${details.name}!\n\nItems:\n${cartItems
      .map((item) => `- ${item.quantity} x ${item.name} (${item.selectedSize}) - ₹${(item.selectedPrice * item.quantity).toFixed(2)}`)
      .join('\n')}\n\nTotal: ₹${cartTotal.toFixed(2)}\n\nDeliver to: ${details.address}\nContact: ${details.phone}`;
    
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onOpenChange(false);
  }

  const handlePlaceOrderClick = () => {
    if (userDetails) {
      placeOrder(userDetails);
    } else {
      setModalOpen(true);
    }
  };

  const handleDetailsSubmit = (details: UserDetails) => {
    localStorage.setItem('tastebud-user', JSON.stringify(details));
    setUserDetails(details);
    setModalOpen(false);
    // After details are submitted, immediately place the order with the new details
    placeOrder(details);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader className="pr-6">
            <SheetTitle>Your Order ({itemCount})</SheetTitle>
          </SheetHeader>
          <Separator />
          {itemCount > 0 ? (
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-6">
                <div className="flex flex-col gap-4 py-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint="food meal"/>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name} <span className="text-xs text-muted-foreground capitalize">({item.selectedSize})</span></h4>
                        <p className="text-sm text-muted-foreground">₹{item.selectedPrice.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-semibold">₹{(item.selectedPrice * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.cartId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <ShoppingCart className="h-24 w-24 text-muted-foreground/50" strokeWidth={1} />
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground">Add some delicious items from the menu to get started.</p>
              <SheetClose asChild>
                <Button asChild>
                    <Link href="/menu">View Menu</Link>
                </Button>
              </SheetClose>
            </div>
          )}
          {itemCount > 0 && (
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                {userDetails && (
                    <div className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                        <p className="font-bold">Deliver to: {userDetails.name}</p>
                        <p>{userDetails.address}</p>
                        <Button variant="link" className="p-0 h-auto" onClick={() => setModalOpen(true)}>Change Address</Button>
                    </div>
                )}
                <Button size="lg" className="w-full" onClick={handlePlaceOrderClick}>
                  {userDetails ? 'Place Order via WhatsApp' : 'Add Details to Order'}
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
      <OrderModal open={isModalOpen} onOpenChange={setModalOpen} onSubmit={handleDetailsSubmit} currentDetails={userDetails} />
    </>
  );
}
