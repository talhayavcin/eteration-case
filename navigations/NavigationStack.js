import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import HomeScreen from "../screens/HomeScreen";
import Filter from "../screens/Filter";
import CartScreen from "../screens/CartScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TabBar from "../components/TabBar"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator(){
  return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen 
        name='HomeScreen' 
        component={HomeScreen}
      />
      <Tab.Screen 
        name='CartScreen' 
        component={CartScreen}
      />
      <Tab.Screen 
        name='FavoritesScreen' 
        component={FavoritesScreen}
      />
      <Tab.Screen 
        name='ProfileScreen' 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}

export default function NavigationStack(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          component={TabNavigator}
          name='TabNavigator'
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name='DetailsScreen'
          component={DetailsScreen}
          options={{ animation: "simple_push" }}
        />
        <Stack.Screen 
          component={Filter}
          name='Filter'
          options={{presentation: "modal"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
