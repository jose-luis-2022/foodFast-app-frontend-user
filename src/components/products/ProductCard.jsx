import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductCard({ product }) {
  const { name, price, img, img_url } = product;
  const { productsCart, setProductsCart } = useContext(AppContext);

  function setProductsCartList(product) {
    const newProductCartList = [
      ...productsCart,
      { client: "", product: product, quantity: 1, total: price },
    ];
    setProductsCart(newProductCartList);
    localStorage.setItem("productsCart", JSON.stringify(newProductCartList));
  }

  return (
    <div className="flex flex-col justify-center items-center shadow rounded-md w-48 space-y-1 pb-3">
      <img
        src={img_url}
        alt={img}
        className="w-full h-40 object-cover rounded-md"
      />
      <p className="text-md">{name}</p>
      <div className="flex items-center gap-1">
        <p className="text-sm font-bold">$ {price}</p>
      </div>
      <button
        onClick={() => setProductsCartList(product)}
        className="flex items-center justify-center text-xs px-2 py-1 gap-1 bg-green-500 text-white rounded-md hover:scale-[103%] duration-200"
      >
        <i className="ri-shopping-cart-2-line"></i>
        <p>Add to Cart</p>
      </button>
    </div>
  );
}

export default ProductCard;
