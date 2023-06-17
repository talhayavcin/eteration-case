import HomeScreen from "./screens/HomeScreen";
import Filter from "./screens/Filter";
import CartScreen from "./screens/CartScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./context/context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, presentation: "modal" }}
            name="Filter"
            component={Filter}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DetailsScreen"
            component={DetailsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CartScreen"
            component={CartScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FavoritesScreen"
            component={FavoritesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
