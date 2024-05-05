import { useState, useEffect } from "react";
import axiosClient from "../../config/axios";
import OrderRow from "../orders/OrderRow";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const apiQuery = async () => {
    const response = await axiosClient.get("/orders");
    setOrders(response.data);
  };

  useEffect(() => {
    apiQuery();
  }, []);

  return (
    <div className="my-10 font-Mulish space-y-10">
      <h1 className="text-xl text-center font-semibold">My Orders</h1>
      <div className="flex p-5 bg-white w-11/12 mx-auto max-h-[500px] overflow-y-scroll">
        <table className={`${orders.length === 0 && "hidden"} w-full`}>
          <tbody>
            <tr>
              <th className="w-[30%] text-xs uppercase text-gray-600">
                Order Details
              </th>
              <th className="w-[10%] text-xs uppercase text-gray-600">
                Total
              </th>
              <th className="w-[10%] text-xs uppercase text-gray-600">
                Order date
              </th>
              <th className="w-[20%] text-xs uppercase text-gray-600">
                Home Address
              </th>
              <th className="w-[10%] text-xs uppercase text-gray-600">
                Order status
              </th>
              <th className="w-[20%] text-xs uppercase text-gray-600">
                Options
              </th>
            </tr>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
      <p
        className={`${
          orders.length === 0 ? "flex" : "hidden"
        } justify-center mt-5 mb-10`}
      >
        There're not orders yet
      </p>
    </div>
  );
}

export default MyOrders;
