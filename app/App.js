import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import Filter from "./screens/Filter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
