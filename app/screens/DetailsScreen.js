import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function DetailsScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="arrow-back-outline" size={40} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{product.name}</Text>
        </View>
        <View style={styles.mainPart}>
          <View style={styles.productPart}>
            <Image style={styles.image} source={{ uri: product.image }} />
            <Text style={styles.productText}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
          <View style={styles.productPrice}>
            <View style={styles.pricePart}>
              <Text>Price: </Text>
              <Text>{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity>
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
    flex: 1,
    backgroundColor: "#2A59FE",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    marginLeft: 60,
  },
  productPart: {},
  pricePart: {
    flexDirection: "column",
  },
  productPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainPart: {
    flex: 12,
    width: "90%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 150,
    maxWidth: 300,
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
  navbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.25,
    padding: 10,
  },
});
