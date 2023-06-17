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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantityInCart } =
    useContext(CartContext);
  const [quantities, setQuantities] = useState(Array(cart.length).fill(1));
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (index, increment) => {
    let newQuantities = [...quantities];
    newQuantities[index] = Math.max(0, newQuantities[index] + increment);

    if (newQuantities[index] === 0) {
      removeFromCart(cart[index].id);
    } else {
      updateQuantityInCart(cart[index].id, increment);
      setQuantities(newQuantities);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const storedQuantities = await AsyncStorage.getItem("quantities");
        if (storedQuantities !== null) {
          setQuantities(JSON.parse(storedQuantities));
        } else {
          setQuantities(Array(cart.length).fill(1));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("quantities", JSON.stringify(quantities));
      } catch (error) {
        console.error(error);
      }
    })();

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * quantities[i];
    }
    setTotalPrice(total);
  }, [cart, quantities]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>E-Market</Text>
        </View>
        <View style={styles.contentPart}>
          <View style={styles.mainPart}>
            {cart.map((product, index) => (
              <View key={product.id} style={styles.productPart}>
                <View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.plusButton}
                    activeOpacity={0.9}
                    onPress={() => updateQuantity(index, -1)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.productNumber}>{quantities[index]}</Text>
                  <TouchableOpacity
                    style={styles.minusButton}
                    activeOpacity={0.9}
                    onPress={() => updateQuantity(index, 1)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.bottom}>
            <View style={styles.pricePart}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>{`${totalPrice} TL`}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.completeButton}>
              <Text style={styles.pricePartText}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 56 + Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight
  },
  headerText: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 24,
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
  contentPart: {
    flex: 1,
    justifyContent: "space-between",
  },
  mainPart: {
    marginTop: 24,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
  },
  pricePart: {
    flexDirection: "column",
  },
  completeButton: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 10,
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