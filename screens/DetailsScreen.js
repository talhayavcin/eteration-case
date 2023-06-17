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
import { CartContext } from "../context/CartContext";
import Constants from "expo-constants";

export default function DetailsScreen({ route }) {
  const { cart, addToCart, removeFromCart, emptyCart } =
    useContext(CartContext);
  const { product } = route.params;
  const navigation = useNavigation();

  const truncate = (input) =>
    input.length > 15 ? `${input.substring(0, 15)}...` : input;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.8}
            onPress={navigation.goBack}
          >
            <Ionicons name="arrow-back-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{truncate(product?.name)}</Text>
          <View style={styles.headerButton} />
        </View>
        <View style={styles.contentPart}>
          <View style={styles.mainPart}>
            <View style={styles.productPart}>
              <Image style={styles.image} source={{ uri: product?.image }} />
              <Text style={styles.productText}></Text>
              <ScrollView>
                <Text style={styles.productDescription}>
                  {product?.description}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.pricePart}>
              <Text style={styles.totalText}>Price:</Text>
              <Text style={styles.totalPrice}>{`${product?.price} TL`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => addToCart(product)}
              activeOpacity={0.9}
              style={styles.completeButton}
            >
              <Text style={styles.pricePartText}>Add to Cart</Text>
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
    paddingLeft: 16,
    paddingRight: 16,
    height: 56 + Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    height: "100%",
    width: 44,
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
    marginRight: 16,
    marginLeft: 75,
  },
  mainPart: {
    width: "90%",
    alignSelf: "center",
    height: "38%",
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
  badge: {
    position: "absolute",
    right: -8,
    top: -3,
    backgroundColor: "red",
    borderRadius: 16,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
