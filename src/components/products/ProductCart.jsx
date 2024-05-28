import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductCart({ product }) {
  const { _id, name, price, img, img_url } = product.product;
  const { products, setProducts, productsCart, setProductsCart } =
    useContext(AppContext);

  const quantityrender = (
    <div className="hidden lg:flex justify-center items-center space-x-3">
      <button
        onClick={() => setQuantityProductMinus(_id)}
        className="font-semibold hover:scale-[103%] duration-200"
      >
        <i className="ri-subtract-line"></i>
      </button>
      <p className="text-sm font-normal px-2 py-0.5 border-2 border-gray-200 rounded-md shadow">
        {product.quantity}
      </p>
      <button
        onClick={() => setQuantityProductPlus(_id)}
        className="font-semibold hover:scale-[103%] duration-200"
      >
        <i className="ri-add-line"></i>
      </button>
    </div>
  );

  const quantityrenderMobile = (
    <div className="flex lg:hidden justify-center items-center space-x-3">
      <p className="text-xs md:text-sm font-normal px-2 py-0.5 border-2 border-gray-200 rounded-md shadow">
        {product.quantity}
      </p>
      <div className="flex flex-col mt-2">
        <button
          onClick={() => setQuantityProductPlus(_id)}
          className="font-semibold hover:scale-[103%] duration-200"
        >
          <i className="ri-add-line"></i>
        </button>
        <button
          onClick={() => setQuantityProductMinus(_id)}
          className="font-semibold hover:scale-[103%] duration-200"
        >
          <i className="ri-subtract-line"></i>
        </button>
      </div>
    </div>
  );

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

    setProducts(
      products.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            isSelected: false,
          };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <tr className="border-b-[1px] border-gray-200">
      <td className="flex items-center px-2 lg:px-5 py-3">
        <button
          onClick={() => deleteProductCart(_id)}
          className="flex items-center lg:mx-3 justify-center text-xs hover:scale-[103%] duration-200"
        >
          <i className="ri-close-line text-lg font-semibold text-gray-600"></i>
        </button>
        <img
          src={img_url}
          alt={img}
          className="h-12 w-[40%] md:w-32 lg:h-24 mx-1 lg:mx-3 object-cover rounded-md"
        />
        <p className="text-xs md:text-sm font-normal text-center lg:mx-3">{name}</p>
      </td>
      <td>
        {quantityrender}
        {quantityrenderMobile}
      </td>
      <td className="text-center">
        <p className="text-xs md:text-sm font-semibold">$ {product.total}</p>
      </td>
    </tr>
  );
}

export default ProductCart;
