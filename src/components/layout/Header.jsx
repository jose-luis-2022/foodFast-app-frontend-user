import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { productsCart } = useContext(AppContext);
  const navigateTo = useNavigate();

  function handleLogOut() {
    navigateTo("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("productsCart");
  }

  const renderCart =
    productsCart.length > 0 ? (
      <Link
        to="/cart"
        className="relative flex items-center gap-2 mx-3 rounded-lg px-2 py-1 text-md leading-7 hover:scale-[103%] duration-700"
      >
        <i className="ri-shopping-cart-2-fill text-xl text-gray-200"></i>
        <p className="absolute top-0 right-[-10%] text-xs bg-gray-700 text-white font-semibold px-1 rounded-full">{productsCart.length}</p>
      </Link>
    ) : (
      <Link
        to="/cart"
        className="relative flex items-center gap-2 mx-3 rounded-lg px-2 py-1 text-md leading-7 hover:scale-[103%] duration-700"
      >
        <i className="ri-shopping-cart-2-line text-xl text-gray-200"></i>
        <p className="absolute top-0 right-[-10%] text-xs bg-gray-700 text-white font-semibold px-1 rounded-full">{productsCart.length}</p>  
      </Link>
    );
  return (
    <header className="bg-[#3e5c76] font-Mulish flex justify-between px-5 md:px-12 lg:px-16 py-1 text-gray-50 shadow">
      <div className="flex lg:flex-1">
        <a href="/" className="flex items-center gap-2 m-1.5 p-1.5">
          <img
            className="h-6 mb-[1px]"
            src="/src/assets/icon-restaurant.png"
            alt="icon"
          />
          <h4 className="text-xl font-[500] font-Dancing">
            Fast Food
          </h4>
        </a>
      </div>

      <div className="flex items-center">
        {renderCart}
        <button
          href="#"
          className="flex items-center rounded-lg px-2 py-1 hover:scale-[103%] duration-700"
          onClick={() => handleLogOut()}
        >
          <i className="ri-logout-box-r-line text-xl"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
