
"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, MenuItem, Size } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, size: Size) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tastebud-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tastebud-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: MenuItem, size: Size) => {
    setCartItems((prevItems) => {
      const cartId = `${item.id}-${size}`;
      const existingItem = prevItems.find((cartItem) => cartItem.cartId === cartId);

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.cartId === cartId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      const selectedPrice = size === 'half' && item.priceHalf ? item.priceHalf : item.price;

      const newCartItem: CartItem = {
        ...item,
        cartId,
        quantity: 1,
        selectedSize: size,
        selectedPrice,
      };
      
      return [...prevItems, newCartItem];
    });
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartId === cartId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.selectedPrice * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemCount,
    isCartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
