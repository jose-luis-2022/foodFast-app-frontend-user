import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/appContext";
import axiosClient from "../../config/axios";
import OrderRow from "../orders/OrderRow";
import MessageMixin from "../tools/MessageMixin";
import ProductDetails from "../products/ProductDetails";
import OrderCardMobile from "../orders/OrderCardMobile";
import Loader from "../tools/Loader";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { messageOrder } = useContext(AppContext);
  const [orderDetail, setOrderDetail] = useState({});
  const { isOpenProductDetails } = useContext(AppContext);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
    setLoadingOrders(false);
  };

  useEffect(() => {
    setTimeout(function () {
      apiQuery();
    }, 1000);
    if (messageOrder) {
      MessageMixin(messageOrder);
      localStorage.removeItem("messageOrder");
    }
  }, []);

  const loadingSection = () => {
    if (loadingOrders) {
      if (orders.length === 0) {
        return <Loader />;
      }
    }
  };

  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <main className="w-full flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:w-[85%] my-10 font-Mulish space-y-10">
          <h1 className="text-2xl text-center font-bold opacity-90">
            My Orders
          </h1>
          <div
            className={`${
              orders.length === 0 ? "hidden" : "flex"
            } p-5 bg-white w-11/12 mx-auto max-h-[550px] overflow-y-scroll`}
          >
            <table className="w-full hidden md:block">
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
                  <OrderRow
                    key={order._id}
                    order={order}
                    setOrderDetail={setOrderDetail}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex flex-col mx-auto space-y-1 md:hidden py-2 overflow-y-scroll">
              {orders.map((order) => (
                <OrderCardMobile
                  key={order._id}
                  order={order}
                  setOrderDetail={setOrderDetail}
                />
              ))}
            </div>
          </div>
          <div
            className={`${
              loadingOrders ? "flex" : "hidden"
            } justify-center py-20`}
          >
            {loadingSection()}
          </div>
          {isOpenProductDetails && <ProductDetails orderDetail={orderDetail} />}
          <div
            className={`${
              orders.length === 0 && !loadingOrders ? "flex" : "hidden"
            } w-full justify-center items-center h-[50vh]`}
          >
            <div className="flex flex-col justify-center items-center space-y-3">
              <i className="ri-information-line text-4xl text-blue-200"></i>
              <p className="text-lg">There're not orders yet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyOrders;
