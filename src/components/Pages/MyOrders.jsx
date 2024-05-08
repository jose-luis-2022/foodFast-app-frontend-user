import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/appContext";
import axiosClient from "../../config/axios";
import OrderRow from "../orders/OrderRow";
import MessageMixin from "../tools/MessageMixin";
import ProductDetails from "../products/ProductDetails";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { messageOrder } = useContext(AppContext);
  const [orderDetail, setOrderDetail] = useState({});
  const { isOpenProductDetails } = useContext(AppContext);

  const apiQuery = async () => {
    const response = await axiosClient.get("/orders");
    if (response.data.length > 0) {
      setOrders(
        response.data.filter(
          (order) => order.client._id === "662d78ffc0c58d5720dabbc4"
        )
      );
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    apiQuery();
    if (messageOrder) {
      MessageMixin(messageOrder);
      localStorage.removeItem("messageOrder");
    }
  }, []);

  return (
    <div className="my-10 font-Mulish space-y-10">
      <h1 className="text-xl text-center font-semibold">My Orders</h1>
      <div
        className={`${
          orders.length === 0 ? "hidden" : "flex"
        } p-5 bg-white w-11/12 mx-auto max-h-[500px] overflow-y-scroll`}
      >
        <table className="w-full">
          <tbody>
            <tr>
              <th className="w-[15%] text-xs uppercase text-gray-600">
                Order number
              </th>
              <th className="w-[15%] text-xs uppercase text-gray-600">
                Total
              </th>
              <th className="w-[15%] text-xs uppercase text-gray-600">
                Order date
              </th>
              <th className="w-[20%] text-xs uppercase text-gray-600">
                Home address
              </th>
              <th className="w-[15%] text-xs uppercase text-gray-600">
                Order status
              </th>
              <th className="w-[20%] text-xs uppercase text-gray-600">
                Options
              </th>
            </tr>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} setOrderDetail={setOrderDetail} />
            ))}
          </tbody>
        </table>
      </div>
      {isOpenProductDetails && <ProductDetails orderDetail={orderDetail} />}
      <div
        className={`${
          orders.length === 0 ? "flex" : "hidden"
        } w-full h-[60vh] flex justify-center items-center`}
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <i className="ri-information-line text-4xl text-blue-200"></i>
          <p className="text-lg">There're not orders yet</p>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
