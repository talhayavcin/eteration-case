import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>E-Market</Text>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search" size={20} color="#656D78" />
          <TextInput
            style={[styles.searchInput]}
            placeholderTextColor="#495466"
            placeholder={"Search"}
          />
        </View>
        <View style={styles.filterPart}>
          <Text style={styles.filtersText}>Filters: </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Filter")}
            style={styles.selectFilter}
          >
            <Text>Select Filter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item: product }) => (
            <View style={styles.productAllPart}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailsScreen", { product: product })
                }
                style={styles.productPart}
              >
                <Image style={styles.image} source={{ uri: product.image }} />
                <Text style={styles.priceText}>{product.price} tl</Text>
                <Text style={styles.productText}>{product.name}</Text>
                <TouchableOpacity style={styles.addToCart}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        />
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
  mainContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "95%",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginVertical: 15,
    backgroundColor: "#f5f5f5",
    width: "90%",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    padding: 4,
    color: "#495466",
  },
  filterPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "90%",
    alignSelf: "center",
  },
  filtersText: {
    fontSize: 18,
    fontWeight: 500,
  },
  selectFilter: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "#D9D9D9",
  },
  productAllPart: {
    padding: 6,
    marginBottom: 5,
    width: "50%",
    height: "42%",
    marginLeft: 5,
  },
  productPart: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: "92%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 150,
    maxWidth: "100%",
    marginBottom: 16,
    resizeMode: "cover",
  },
  priceText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2A59FE",
    marginBottom: 16,
  },
  productText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 16,
  },
  addToCart: {
    backgroundColor: "#2A59FE",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 6,
    width: "100%",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 400,
  },
});
