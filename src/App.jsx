import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/Signup";
import Home from "./components/Pages/Home";
import MyOrders from "./components/Pages/MyOrders";
import MyReservations from "./components/Pages/MyReservations";
import MyProfile from "./components/Pages/MyProfile";
import CheckoutSection from "./components/Cart/CheckoutSection";
import Cart from "./components/Pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-checkout" element={<CheckoutSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
