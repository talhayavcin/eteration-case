import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/context";

export default function DetailsScreen({ route }) {
  const { cart, addToCart, removeFromCart, emptyCart } =
    useContext(CartContext);
  const { product } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="arrow-back-outline" size={40} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{product.name}</Text>
        </View>
        <View style={styles.contentPart}>
          <View style={styles.mainPart}>
            <View style={styles.productPart}>
              <Image style={styles.image} source={{ uri: product.image }} />
              <Text style={styles.productText}>{product.name}</Text>
              <ScrollView>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.pricePart}>
              <Text style={styles.totalText}>Price:</Text>
              <Text style={styles.totalPrice}>{`${product.price} TL`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => addToCart(product)}
              style={styles.completeButton}
            >
              <Text style={styles.pricePartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="ios-home-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
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
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    marginLeft: 75,
  },
  mainPart: {
    width: "90%",
    alignSelf: "center",
    height: "75%",
  },
  contentPart: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 225,
    maxWidth: "100%",
    marginBottom: 12,
    marginTop: 12,
    resizeMode: "cover",
  },
  productText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#000",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: 400,
  },
  productPart: {
    marginTop: 4,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.25,
    padding: 10,
    backgroundColor: " #fff",
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
