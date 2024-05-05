import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/appContext";
import ProductCart from "../products/ProductCart";
import Spinner from "../tools/Spinner";
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";

function Cart() {
  const { productsCart } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const date = new Date();

  function sendOrder() {
    Swal.fire({
      text: "Do you want to send the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (address === "") {
          Swal.fire({
            text: "You need to enter a home address",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          })
        } else {
          setLoading(true);
          setTimeout(async () => {
            const order = {
              client: "662d78ffc0c58d5720dabbc4",
              address: address,
              order: productsCart.map((productCart) => {
                return {
                  product: productCart.product._id,
                  quantity: productCart.quantity,
                };
              }),
              total: productsCart.reduce((total, productCart) => {
                return total + productCart.total;
              }, 0),
              order_date:
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear(),
              status: "In line",
              order_time_hour: date.getHours(),
              order_time_minute: date.getMinutes(),
            };

            await axiosClient.post("/orders", order).then((res) => {
              if (res.status === 200) {
                localStorage.removeItem("productsCart");
                localStorage.setItem(
                  "messageCart",
                  JSON.stringify(res.data.message)
                );
                window.location.href = "/";
              }
            });

            setLoading(false);
          }, 2000);
        }
      }
    });
  };

  return (
    <div className="my-10 font-Mulish flex">
      <div
        className={`${
          productsCart.length === 0 ? "w-10/12 mx-auto" : "w-[70%]"
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
          } justify-center mt-5 mb-10`}
        >
          There're not products to buy yet
        </p>
      </div>
      <div
        className={`${
          productsCart.length === 0 ? "hidden" : "flex"
        } w-[30%] flex-col items-center space-y-5`}
      >
        <div className=" border-b-[1px] border-gray-600 mb-5 p-5">
          <h1 className="text-normal text-center font-bold">Order Summary</h1>
        </div>
        <div
          className={`${
            productsCart.length === 0 ? "hidden" : "block"
          } px-2 space-y-5`}
        >
          <p className="text-sm">Address</p>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Write your address"
            className="w-full px-2 py-1 rounded-md text-sm hover:scale-[103%] duration-700"
          />
        </div>
        <div className={`${productsCart.length > 0 ? "flex" : "hidden"}`}>
          <p className="text-sm font-bold">
            Total order:
            <span className="text-sm font-black">
              {" "}
              ${" "}
              {productsCart.reduce(
                (total, product) => total + product.total,
                0
              )}
            </span>
          </p>
        </div>
        <button
          onClick={() => sendOrder()}
          className="bg-yellow-300 flex items-center justify-center px-3 py-2 rounded-md text-sm font-bold hover:scale-[103%] duration-500"
        >
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center gap-2">
              <i className="ri-bank-card-fill"></i>
              <p>Checkout</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Cart;
