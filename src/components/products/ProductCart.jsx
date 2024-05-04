import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductCart({ product }) {
  const { _id, name, price, img, img_url } = product.product;
  const { productsCart, setProductsCart } = useContext(AppContext);

  function setQuantityProductPlus(id) {
    const productsCartUpdated = productsCart.map((productCart) => {
      if (productCart.product._id === id) {
        return {
          ...productCart,
          quantity: productCart.quantity + 1,
          total: (productCart.quantity + 1) * price,
        };
      } else {
        return productCart;
      }
    });
    setProductsCart(productsCartUpdated);
    localStorage.setItem("productsCart", JSON.stringify(productsCartUpdated));
  }

  function setQuantityProductMinus(id) {
    const productsCartUpdated = productsCart.map((productCart) => {
      if (productCart.product._id === id) {
        return {
          ...productCart,
          quantity: productCart.quantity > 1 ? productCart.quantity - 1 : 1,
          total:
            (productCart.quantity > 1 ? productCart.quantity - 1 : 1) * price,
        };
      } else {
        return productCart;
      }
    });
    setProductsCart(productsCartUpdated);
    localStorage.setItem("productsCart", JSON.stringify(productsCartUpdated));
  }

  function deleteProductCart(id) {
    const productsCartUpdated = productsCart.filter(
      (productCart) => productCart.product._id !== id
    );
    setProductsCart(productsCartUpdated);
    localStorage.setItem("productsCart", JSON.stringify(productsCartUpdated));
  }

  return (
    <tr className="border-b-[1px] border-gray-200">
      <td className="flex items-center px-5 py-2">
        <button
          onClick={() => deleteProductCart(_id)}
          className="flex items-center mx-3 justify-center text-xs p-1 gap-1 bg-red-400 text-white rounded-md hover:scale-[103%] duration-200"
        >
          <i className="ri-close-line text-[16px] font-semibold"></i>
        </button>
        <img
          src={img_url}
          alt={img}
          className="h-24 mx-3 object-cover rounded-md"
        />
        <p className="text-sm font-normal mx-3">{name}</p>
      </td>
      <td>
        <div className="flex justify-center items-center space-x-3">
          <button
            onClick={() => setQuantityProductMinus(_id)}
            className="bg-red-400 text-white px-1 rounded-full"
          >
            <i className="ri-subtract-line"></i>
          </button>
          <p className="text-sm font-normal px-2 py-0.5 border-2 border-gray-200 rounded-md shadow">
            {product.quantity}
          </p>
          <button
            onClick={() => setQuantityProductPlus(_id)}
            className="bg-green-400 text-white px-1 rounded-full"
          >
            <i className="ri-add-line"></i>
          </button>
        </div>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">$ {product.total}</p>
      </td>
    </tr>
  );
}

export default ProductCart;
