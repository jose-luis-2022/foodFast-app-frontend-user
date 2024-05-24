import { useContext, useState } from "react";
import { AppContext } from "../../../context/appContext";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";  
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";
import Spinner from "../tools/Spinner";

function CheckoutSection() {
  const { productsCart } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState("");
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
          });
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
              suggestions: suggestions,
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

            console.log(order);

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
  }

  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <main className="w-full flex flex-col md:flex-row">
        <Sidebar />
        <div
          className={`${
            productsCart.length === 0 ? "hidden" : "flex"
          } w-full flex-col px-20 mt-5 md:mt-16 lg:mt-0`}
        >
          <div className="lg:hidden">
            <a
              href="/cart"
              className="absolute left-12 md:left-auto bg-gray-300 flex items-center justify-center px-2 py-1 rounded-md text-sm font-bold hover:scale-[103%] duration-500"
            >
              <i className="ri-arrow-left-line"></i>
            </a>
          </div>
          <div className="space-y-5 flex flex-col justify-center">
            <div className=" border-b-[1px] border-gray-600 mb-5 py-5 px-5 ">
              <h1 className="text-normal text-center font-bold">
                Order Summary
              </h1>
            </div>
            <div
              className={`${
                productsCart.length === 0 ? "hidden" : "block"
              } space-y-5`}
            >
              <p className="text-sm">Suggestions</p>
              <textarea
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Write your suggestions"
                className="w-full px-2 py-1 rounded-md text-sm hover:scale-[103%] duration-700"
              />
            </div>
            <div
              className={`${
                productsCart.length === 0 ? "hidden" : "block"
              } space-y-5`}
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
      </main>
    </div>
  );
}

export default CheckoutSection;
