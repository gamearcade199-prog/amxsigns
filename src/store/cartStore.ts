import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";

export interface CustomSignDetails {
  text: string;
  fontName: string;
  fontFamily: string;
  color: string;
  colorHex: string;
  backing: string;
  dimensions: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedPrice: number;
  customDetails?: CustomSignDetails;
  cartItemId?: string; // unique id for custom signs to prevent merging
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, price: number, customDetails?: CustomSignDetails) => void;
  removeItem: (productId: string, size: string, cartItemId?: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncPrices: (freshProducts: { id: string; price: number; original_price?: number; variants?: Product["variants"] }[]) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, size, price, customDetails?) =>
        set((state) => {
          // Custom signs are always unique — never merge them
          if (customDetails) {
            const cartItemId = `custom-${Date.now()}-${Math.random()}`;
            return { items: [...state.items, { product, quantity: 1, selectedSize: size, selectedPrice: price, customDetails, cartItemId }] };
          }
          const existing = state.items.find(
            (item) => item.product.id === product.id && item.selectedSize === size && !item.customDetails
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.selectedSize === size && !item.customDetails
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1, selectedSize: size, selectedPrice: price }] };
        }),
      removeItem: (productId, size, cartItemId?) =>
        set((state) => ({
          items: state.items.filter((item) => {
            if (cartItemId) return item.cartItemId !== cartItemId;
            return !(item.product.id === productId && item.selectedSize === size && !item.customDetails);
          }),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.product.id === productId && item.selectedSize === size)
              ),
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId && item.selectedSize === size ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      syncPrices: (freshProducts) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.customDetails) return item; // never touch custom signs
            const fresh = freshProducts.find((p) => p.id === item.product.id);
            if (!fresh) return item;
            return {
              ...item,
              selectedPrice: fresh.variants?.[item.selectedSize.toLowerCase() as keyof Product["variants"]]?.price ?? fresh.price,
              product: { 
                ...item.product, 
                price: fresh.price, 
                original_price: fresh.original_price, 
                variants: fresh.variants ?? item.product.variants 
              },
            };
          }),
        })),
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => {
          // Custom signs keep their calculated price (no live product price to reference)
          if (item.customDetails) return sum + item.selectedPrice * item.quantity;
          // Regular items: always use the live price from the product object
          const livePrice =
            item.product.variants?.[item.selectedSize.toLowerCase() as keyof typeof item.product.variants]?.price ??
            item.product.price;
          return sum + livePrice * item.quantity;
        }, 0),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "amx-cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
