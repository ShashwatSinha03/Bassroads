import { create } from 'zustand';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) return state;
      return { items: [...state.items, product] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },

  clearWishlist: () => set({ items: [] }),
}));