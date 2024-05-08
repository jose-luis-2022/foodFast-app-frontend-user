import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/Signup";
import Home from "./components/Pages/Home";
import MyOrders from "./components/Pages/MyOrders";
import MyReservations from "./components/Pages/MyReservations";
import MyProfile from "./components/Pages/MyProfile";
import Cart from "./components/Pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";

const render = (
  <BrowserRouter>
    <div className="bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  </BrowserRouter>
);

const renderClientPages = (
  <BrowserRouter>
    <div className="bg-[#EFF7F6]">
      <Header />
      <div className="flex pr-20">
        <Sidebar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-reservations" element={<MyReservations />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </div>
  </BrowserRouter>
);

function App() {
  return renderClientPages;
}

export default App;
