import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("cart").then((storedCart) => {
      if (storedCart) setCart(JSON.parse(storedCart));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setQuantities(cart.map((item) => item.quantity));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productIndex = currentCart.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productID) => {
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== productID)
    );
  };

  const emptyCart = () => {
    setCart([]);
  };

  const updateQuantityInCart = (productID, increment) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productID
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + increment),
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
