import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { notchHeight }  from "../utils/device-info"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const iconSize = 30 
export default function TabBar({ navigation }){

  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        onPress={() => navigation.navigate("HomeScreen")} 
        style={styles.navButton} 
        activeOpacity={0.9}
      >
        <Ionicons name="ios-home-outline" size={iconSize} color="black" />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("CartScreen")} 
        style={styles.navButton} 
        activeOpacity={0.9}
      >
        <Ionicons name="ios-basket-outline" size={iconSize} color="black" />
        {/* {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalQuantity}</Text>
          </View>
        )} */}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("FavoritesScreen")} 
        style={styles.navButton} 
        activeOpacity={0.9}
      >
        <Ionicons name="ios-star-outline" size={iconSize} color="black" />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("ProfileScreen")} 
        style={styles.navButton} 
        activeOpacity={0.9}
      >
        <Ionicons name="person-outline" size={iconSize} color="black" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderTopColor: "gray",
    borderTopWidth: 1,
    height: 64 + notchHeight(),
    paddingBottom: notchHeight()
  },
  navButton: {
    flex: 1,
    height: "100%",
    margin: 1,
    justifyContent: 'center',
    alignItems: "center",
  }
  
})
