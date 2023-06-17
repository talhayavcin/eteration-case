import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const width = Dimensions.get("window").width;

export default function HomeScreen({ route }) {
  const { selectedOption, checkedItems } = route.params || {};
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart, removeFromCart, emptyCart } =
    useContext(CartContext);
  const [page, setPage] = useState(1);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

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
    if (!isLoading) {
      setPage(page + 1);
    }
  };
  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(
      (favProduct) => favProduct.id === product.id
    );

    if (isFavorite) {
      // If the product is already in the favorites, remove it.
      removeFavorite(product);
    } else {
      // If the product is not in the favorites, add it.
      addFavorite(product);
    }
  };

  const isFavorite = (product) =>
    favorites.some((favorite) => favorite.id === product.id);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle={"light-content"} />
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
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Filter")}
            style={styles.selectFilter}
          >
            <Text>Select Filter</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={displayedProducts}
              onEndReached={!isLoading && handleLoadMore}
              onEndReachedThreshold={0.5}
              style={styles.flatlist}
              numColumns={2}
              contentContainerStyle={styles.flatlistContainer}
              renderItem={({ item: product }) => {
                const isFavorite = favorites.some(
                  (favorite) => favorite.id === product.id
                );

                return (
                  <TouchableOpacity
                    key={product.name + "test"}
                    style={styles.productAllPart}
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate("DetailsScreen", { product: product })
                    }
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: product.image }}
                    />
                    <Text style={styles.priceText}>{product.price} tl</Text>
                    <Text numberOfLines={1} style={styles.productText}>
                      {product.name}
                    </Text>

                    <TouchableOpacity
                      onPress={() => addToCart(product)}
                      activeOpacity={0.9}
                      style={styles.addToCart}
                    >
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.starButton}
                      activeOpacity={0.9}
                      onPress={() => toggleFavorite(product)}
                    >
                      <Ionicons
                        name="ios-star-sharp"
                        size={24}
                        color={isFavorite ? "#FFB800" : "#D9D9D9"}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          )}
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
    paddingTop: Constants.statusBarHeight,
  },
  headerText: {
    color: "#fff",
    fontWeight: "800",
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

  //flatlist
  flatlist: {
    width: "100%",
    marginTop: 8,
  },
  flatlistContainer: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  productAllPart: {
    backgroundColor: "white",
    marginBottom: 16,
    marginHorizontal: 8,
    height: 290,
    maxWidth: (width - 48) / 2,
    alignSelf: "baseline",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: (width - 88) / 2,
    flex: 1,
    maxHeight: 150,
    borderRadius: 5,
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
  starButton: {
    position: "absolute",
    right: 12,
    top: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
