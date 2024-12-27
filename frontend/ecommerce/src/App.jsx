import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/loginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import CartScreen from "./components/screens/CartScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CheckoutScreen from "./components/screens/CheckoutScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderSuccessScreen from "./components/screens/OrderSuccessScreen";
import OrderHistory from "./components/screens/OrderHistory";
import SearchScreen from "./components/screens/SearchScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/success" element={<OrderSuccessScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/order/history" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
