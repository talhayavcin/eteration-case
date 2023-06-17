import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

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

  useEffect(() => {
    setQuantities(cart.map((item) => item.quantity));
  }, [cart]);

  // Ürün ekleme işlemi
  const addToCart = (product) => {
    setCart((currentCart) => {
      // Ürünün zaten sepette olup olmadığını kontrol ediyoruz.
      const productIndex = currentCart.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        // Eğer ürün zaten sepetteyse, sadece quantity'yi arttırıyoruz.
        const updatedCart = [...currentCart];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Eğer ürün daha önce eklenmemişse, yeni bir ürün olarak ekliyoruz ve quantity'yi 1 olarak belirliyoruz.
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
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
