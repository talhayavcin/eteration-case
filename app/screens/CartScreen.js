import React, { useContext } from "react";
import { CartContext } from "../context/context";
import { View, Text } from "react-native";

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  return (
    <View>
      {cart.map((product, index) => (
        <View key={index}>
          <Text>{product.name}</Text>
          <Text>{product.price}</Text>
        </View>
      ))}
    </View>
  );
}
