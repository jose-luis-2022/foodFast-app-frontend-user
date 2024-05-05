import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { Link } from "react-router-dom";

function Header() {
  const { productsCart } = useContext(AppContext);

  const renderCart =
    productsCart.length > 0 ? (
      <Link
        to="/cart"
        className="relative flex items-center gap-2 mx-3 rounded-lg px-2 py-1 text-md leading-7 text-gray-900 hover:bg-gray-50"
      >
        <i className="ri-shopping-cart-2-fill text-xl text-gray-700"></i>
        <p className="absolute top-0 right-[-10%] text-xs bg-gray-700 text-white font-semibold px-1 rounded-full">{productsCart.length}</p>
      </Link>
    ) : (
      <Link
        to="/cart"
        className="relative flex items-center gap-2 mx-3 rounded-lg px-2 py-1 text-md leading-7 text-gray-900 hover:bg-gray-50"
      >
        <i className="ri-shopping-cart-2-line text-xl text-gray-700"></i>
        <p className="absolute top-0 right-[-10%] text-xs bg-gray-700 text-white font-semibold px-1 rounded-full">{productsCart.length}</p>  
      </Link>
    );
  return (
    <header className="bg-[#FBFDFF] font-Mulish flex justify-around px-16 py-2">
      <div className="flex lg:flex-1">
        <a href="#" className="flex items-center gap-2 m-1.5 p-1.5">
          <img
            className="h-6 mb-[1px]"
            src="/src/assets/icon-restaurant.png"
            alt="icon"
          />
          <h4 className="text-xl text-gray-600 font-[500] font-Dancing">
            Fast Food
          </h4>
        </a>
      </div>

      <div className="flex items-center">
        {renderCart}
        <a
          href="#"
          className="flex items-center gap-2 mr-3 rounded-lg px-2 py-1 text-md leading-7 text-gray-900 hover:bg-gray-50"
        >
          <p>Log out</p>
          <i className="ri-arrow-right-line"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;
