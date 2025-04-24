import { create } from 'zustand';

interface CartState {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((product) => product.sku === item.sku);
    if (existingItem) {
      return {
        items: state.items.map((product) =>
          product.sku === item.sku ? { ...product, quantity: item.quantity } : product
        ),
      };
    }
    return {
      items: [...state.items, { ...item }],
    };
  }),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((item) => item.sku !== itemId),
  })),
  clearCart: () => set({ items: [] })
}));