import { createContext, useContext, useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string | null
}

interface CartContextValue {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>) => void
  remove: (id: string) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function add(item: Omit<CartItem, 'quantity'>) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  function remove(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function increment(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
  }

  function decrement(id: string) {
    setItems(prev => {
      const item = prev.find(i => i.id === id)
      if (!item) return prev
      if (item.quantity <= 1) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
    })
  }

  function clear() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, increment, decrement, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
