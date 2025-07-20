'use client'

import React, { createContext, useContext, useRef } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from '@/hooks/use-toast'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
        
        toast({
          title: 'Added to cart',
          description: `${item.name} has been added to your cart.`,
          variant: 'default',
        })
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
        toast({
          title: 'Removed from cart',
          description: 'Item has been removed from your cart.',
          variant: 'default',
        })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => {
        set({ items: [] })
        toast({
          title: 'Cart cleared',
          description: 'All items have been removed from your cart.',
          variant: 'default',
        })
      },
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

const CartContext = createContext<typeof useCartStore | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<typeof useCartStore>()
  if (!storeRef.current) {
    storeRef.current = useCartStore
  }

  return (
    <CartContext.Provider value={storeRef.current}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cartStore = useContext(CartContext)
  if (!cartStore) {
    throw new Error('useCart must be used within CartProvider')
  }
  return cartStore()
}