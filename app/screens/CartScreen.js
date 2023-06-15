import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(Array(cart.length).fill(1));
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (index, increment) => {
    const newQuantities = [...quantities];
    newQuantities[index] += increment;

    if (newQuantities[index] < 1) {
      removeFromCart(cart[index].id);
      newQuantities.splice(index, 1);
    }
    setQuantities(newQuantities);
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * quantities[i];
    }
    setTotalPrice(total);
  }, [quantities]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>E-Market</Text>
        </View>
        <View style={styles.mainPart}>
          {cart.map((product, index) => (
            <View key={index} style={styles.productPart}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.plusButton}
                  onPress={() => updateQuantity(index, -1)}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.productNumber}>{quantities[index]}</Text>
                <TouchableOpacity
                  style={styles.minusButton}
                  onPress={() => updateQuantity(index, 1)}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.bottom}>
            <View style={styles.pricePart}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>{totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.pricePartText}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="ios-home-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ios-basket-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ios-star-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  headerContainer: {
    backgroundColor: "#2A59FE",
    padding: 12,
  },
  headerText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.25,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 400,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 500,
    color: "#2A59FE",
  },
  plusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  minusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  productNumber: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2A59FE",
    fontSize: 18,
    fontWeight: 400,
    color: "#fff",
  },
  productPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  mainPart: {
    flex: 1,
    marginTop: 24,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  pricePart: {
    flexDirection: "column",
  },
  completeButton: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#2A59FE",
    borderRadius: 4,
  },
  pricePartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
  },
  totalText: {
    color: "#2A59FE",
    fontWeight: 400,
    fontSize: 18,
  },
  totalPrice: {
    fontWeight: 600,
    fontSize: 18,
  },
});
