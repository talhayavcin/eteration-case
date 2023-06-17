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
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ route }) {
  const { selectedOption, checkedItems } = route.params || {};
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart, removeFromCart, emptyCart } =
    useContext(CartContext);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const totalQuantity = cart.reduce(
    (sum, product) => sum + (product.quantity || 1),
    0
  );

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the products
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((response) => {
        let filteredProducts = response.data;

        if (searchText) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        if (checkedItems && checkedItems.length > 0) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              checkedItems.includes(product.brand) ||
              checkedItems.includes(product.model)
          );
        }

        switch (selectedOption) {
          case "1":
            filteredProducts.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
          case "2":
            filteredProducts.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;
          case "3":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case "4":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          default:
            break;
        }
        setProducts(filteredProducts);
        setDisplayedProducts(filteredProducts.slice(0, 12 * page));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [selectedOption, checkedItems, searchText, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((storedFavorites) => {
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const toggleFavorite = (product) => {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favProduct) => favProduct.id === product.id
      );
      if (isFavorite) {
        // Ürün zaten favorilerdeyse, çıkar.
        return currentFavorites.filter(
          (favProduct) => favProduct.id !== product.id
        );
      } else {
        // Ürün favorilerde değilse, ekle.
        return [...currentFavorites, product];
      }
    });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
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
          data={displayedProducts}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
            width: "90%",
            marginTop: 22,
            marginLeft: 6,
          }}
          renderItem={({ item: product }) => {
            const isFavorite = favorites.some(
              (favorite) => favorite.id === product.id
            );
            return (
              <View style={styles.productAllPart}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetailsScreen", { product: product })
                  }
                  style={styles.productPart}
                >
                  <TouchableOpacity
                    style={styles.starButton}
                    onPress={() => toggleFavorite(product)}
                  >
                    <Ionicons
                      name="ios-star-sharp"
                      size={24}
                      color={isFavorite ? "#FFB800" : "#D9D9D9"}
                    />
                  </TouchableOpacity>
                  <Image style={styles.image} source={{ uri: product.image }} />
                  <Text style={styles.priceText}>{product.price} tl</Text>
                  <Text style={styles.productText}>{product.name}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(product)}
                    style={styles.addToCart}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="ios-home-outline" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="ios-basket-outline" size={36} color="black" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoritesScreen")}
        >
          <Ionicons name="ios-star-outline" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={36} color="black" />
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
    fontWeight: 800,
    fontSize: 24,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.25,
    padding: 10,
    marginHorizontal: 8,
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
  filterPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
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
    marginBottom: 10,
    width: "47%",
    marginLeft: 16,
    backgroundColor: "#fff",
    height: Dimensions.get("window").height / 2.2,
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
