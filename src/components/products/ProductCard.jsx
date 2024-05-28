import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import ProductDescription from "./ProductDescription";

function ProductCard({ product, setProductDescription}) {
  const { name, price, img, img_url, isSelected, description } = product;
  const { products, setProducts, productsCart, setProductsCart, setIsOpenProductDescription } =
    useContext(AppContext);

  function setProductsCartList(product) {
    setProducts(
      products.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            isSelected: true,
          };
        } else {
          return item;
        }
      })
    );
    const newProductCartList = [
      ...productsCart,
      { client: "", product: product, quantity: 1, total: price },
    ];
    setProductsCart(newProductCartList);
    localStorage.setItem("productsCart", JSON.stringify(newProductCartList));
  }

  function watchProductDetail({name, description}) {
    setProductDescription([name, description])
    setIsOpenProductDescription(true)
  }

  return (
    <div className="relative flex flex-col items-center shadow rounded-lg w-52 h-52 bg-[#b9faf8]">
      <img
        src={img_url}
        alt={img}
        className="w-full object-cover h-40 rounded-t-md mb-1 opacity-95"
      />
      <button
        className="text-sm font-bold text-gray-700 text-center"
        onClick={() => watchProductDetail({name, description})}
      >
        {name}
      </button>
      <p className="text-xs font-bold text-gray-600 my-1">
        $ {price.toString().slice(0, 2)}.{price.toString().slice(2, 6)}
      </p>
      <div className="absolute top-2 right-2 ">
        <button
          onClick={() => setProductsCartList(product)}
          disabled={isSelected && "disabled"}
          className={`flex items-center justify-center text-xs w-8 h-8 ${
            isSelected ? "bg-gray-400" : "bg-yellow-400"
          } text-black font-semibold rounded-full hover:scale-[103%] duration-200`}
        >
          <i className="ri-shopping-cart-2-line"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
