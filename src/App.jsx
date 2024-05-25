import ValidationPage from "./components/middlewares/ValidationPage";
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
        <Route
          path="/"
          element={
            <ValidationPage>
              <Home />
            </ValidationPage>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ValidationPage>
              <MyOrders />
            </ValidationPage>
          }
        />
        <Route
          path="/my-reservations"
          element={
            <ValidationPage>
              <MyReservations />
            </ValidationPage>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ValidationPage>
              <MyProfile />
            </ValidationPage>
          }
        />
        <Route
          path="/cart"
          element={
            <ValidationPage>
              <Cart />
            </ValidationPage>
          }
        />
        <Route
          path="/order-checkout"
          element={
            <ValidationPage>
              <CheckoutSection />
            </ValidationPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
