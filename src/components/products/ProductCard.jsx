import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductCard({ product }) {
  const { name, price, img, img_url, isSelected } = product;
  const { products, setProducts, productsCart, setProductsCart } =
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

  return (
    <div className="flex flex-col justify-center items-center shadow rounded-md w-48 space-y-2 pb-3 bg-[#b9faf8]">
      <img
        src={img_url}
        alt={img}
        className="w-full h-40 object-cover rounded-t-md"
      />
      <p className="text-normal font-bold text-gray-700">{name}</p>
      <p className="text-sm font-bold text-gray-600">$ {price}</p>
      <button
        onClick={() => setProductsCartList(product)}
        disabled={isSelected && "disabled"}
        className={`flex items-center justify-center text-xs px-2 py-1 gap-1 ${
          isSelected ? "bg-gray-400" : "bg-[#00c49a]"
        } text-white rounded-md hover:scale-[103%] duration-200`}
      >
        <i className="ri-shopping-cart-2-line"></i>
        <p>Add to Cart</p>
      </button>
    </div>
  );
}

export default ProductCard;
