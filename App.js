import { FavoriteProvider } from "./context/FavoriteContext";
import { CartProvider } from "./context/CartContext";
import NavigationStack from "./navigations/NavigationStack";

export default function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <NavigationStack />
      </FavoriteProvider>
    </CartProvider>
  );
}
