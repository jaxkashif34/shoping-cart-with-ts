import { createContext, useContext, ReactNode, useState } from 'react';
import { ShopingCart } from '../components/ShopingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartItem = {
  id: number;
  quantity: number;
};

type ShopingCartProviderProps = {
  increaseItemQuantity: (id: number) => void;
  getItemQuantity: (id: number) => number;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

const ShopinCartContext = createContext({} as ShopingCartProviderProps);

export function useShopingCart() {
  return useContext(ShopinCartContext);
}

export function ShopingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shoping-cart', () => []);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

  function increaseItemQuantity(id: number) {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item == null) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item?.quantity === 1) return prev.filter((item) => item.id !== id);
      else {
        return prev.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
      }
    });
  }

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <ShopinCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem, cartQuantity, cartItems, openCart, closeCart, isOpen }}>
      {children}
      <ShopingCart />
    </ShopinCartContext.Provider>
  );
}
