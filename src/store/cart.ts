import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string; // The specific variation/size/weight combo unique ID, or just product ID for now
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    size?: string;
    weight?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex((i) => i.id === newItem.id);

                    if (existingItemIndex > -1) {
                        // Item exists, update quantity
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += newItem.quantity;
                        return { items: updatedItems };
                    }
                    // New item
                    return { items: [...state.items, newItem] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getCartCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: "stag-kashmir-cart", // Key used in local storage
        }
    )
);
