import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../context/context";
import Constants from 'expo-constants';

export default function HomeScreen({ route }) {
  const [searchText, setSearchText] = useState("");
  const { cart, addToCart, removeFromCart, emptyCart } =
    useContext(CartContext);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const totalQuantity = cart.reduce(
    (sum, product) => sum + (product.quantity || 1),
    0
  );

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const toggleFavorite = async (product) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((item) => item.id === product.id);
    if (index > -1) {
      // Ürün zaten favorilerde ise çıkarılıyor
      updatedFavorites.splice(index, 1);
    } else {
      // Ürün favorilere ekleniyor
      updatedFavorites.push(product);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const displayedFavorites = favorites.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </View>
        <FlatList
          data={displayedFavorites}
          contentContainerStyle={{
            width: "90%",
            marginTop: 6,
            marginLeft: 2,
          }}
          renderItem={({ item: product }) => (
            <View style={styles.productAllPart}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("DetailsScreen", { product: product })
                }
              >
                <TouchableOpacity
                  style={styles.starButton}
                  activeOpacity={0.9}
                  onPress={() => toggleFavorite(product)}
                >
                  <Ionicons name="ios-star-sharp" size={24} color="#FFB800" />
                </TouchableOpacity>
                <Image style={styles.image} source={{ uri: product.image }} />
                <Text style={styles.priceText}>{product.name}</Text>
                <Text style={styles.productText}>{product.price} tl</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => addToCart(product)}
                  style={styles.addToCart}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        />
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
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    padding: 4,
    color: "#495466",
  },
  productAllPart: {
    width: "100%",
    marginLeft: 16,
    backgroundColor: "#fff",
    height: Dimensions.get("window").height / 2.3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
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
  starButton: {
    position: "absolute",
    right: 6,
    top: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
