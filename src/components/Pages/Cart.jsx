import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import ProductCart from "../products/ProductCart";
import CheckoutSection from "../Cart/CheckoutSection";

function Cart() {
  const { productsCart } = useContext(AppContext);

  return (
    <div className="h-[70vh] lg:my-10 font-Mulish flex flex-col lg:justify-center lg:flex-row px-5 sm:px-0">
      <div
        className={`${
          productsCart.length === 0 ? "w-10/12 mx-auto" : "w-full lg:w-[60%]"
        } bg-white shadow`}
      >
        <div className="w-full px-5 bg-white">
          <div className="flex justify-between items-center px-5 border-b-[1px] border-gray-600 py-5">
            <h1 className="text-normal text-center font-bold">My Order</h1>
            <p className="text-sm text-center font-bold">
              {productsCart.length} items
            </p>
          </div>
        </div>
        <div className="flex p-5 bg-white max-h-[500px] overflow-y-scroll">
          <table className={`${productsCart.length === 0 && "hidden"} w-full`}>
            <tbody>
              <tr>
                <th className="w-[50%] text-xs uppercase text-gray-600">
                  Product Details
                </th>
                <th className="w-[30%] text-xs uppercase text-gray-600">
                  Quantity
                </th>
                <th className="w-[20%] text-xs uppercase text-gray-600">
                  Subtotal
                </th>
              </tr>
              {productsCart.map((product) => (
                <ProductCart key={product.product._id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
        <p
          className={`${
            productsCart.length === 0 ? "flex" : "hidden"
          } text-sm sm:text-normal justify-center mt-5 mb-10`}
        >
          There're not products to buy yet
        </p>
      </div>
      <div className="hidden lg:block">
        <CheckoutSection />
      </div>
      {productsCart.length > 0 && (
        <div className="flex lg:hidden mt-5 justify-end">
          <a
            href="/order-checkout"
            className="bg-blue-300 flex items-center justify-center px-3 py-2 rounded-md text-sm font-bold hover:scale-[103%] duration-500"
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
}

export default Cart;
