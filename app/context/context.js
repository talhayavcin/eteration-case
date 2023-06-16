import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Durumu AsyncStorage'den yükle
  useEffect(() => {
    AsyncStorage.getItem("cart").then((storedCart) => {
      if (storedCart) setCart(JSON.parse(storedCart));
    });
  }, []);

  // Durumu AsyncStorage'e kaydet
  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Ürün ekleme işlemi
  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  // Ürün silme işlemi
  const removeFromCart = (productID) => {
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== productID)
    );
  };

  // Sepeti boşaltma işlemi
  const emptyCart = () => {
    setCart([]);
  };

  const updateQuantityInCart = (productID, increment) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productID
          ? {
              ...product,
              quantity: Math.max(0, (product.quantity || 1) + increment),
            }
          : product
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        emptyCart,
        updateQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
