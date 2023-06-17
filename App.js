import { CartProvider } from "./context/context";
import NavigationStack from "./navigations/NavigationStack";

export default function App() {
  return (
    <CartProvider>
      <NavigationStack/>
    </CartProvider>
  );
}
