import { useContext } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import { AppContext } from "../../../context/appContext";

function OrderCardMobile({ order, setOrderDetail }) {
  const { _id, client, total, order_date, address, status } = order;
  const { setIsOpenProductDetails } = useContext(AppContext);

  async function watchOrderDetails(order) {
    setOrderDetail(order);
    setIsOpenProductDetails(true);
  }

  async function editOrder(id) {
    const { value: newAddress } = await Swal.fire({
      title: "Edit your address",
      input: "text",
      inputLabel: "Your new address",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write a new address!";
        }
      },
    });
    if (newAddress) {
      await axiosClient
        .patch(`/orders/${id}`, { address: newAddress })
        .then((res) => {
          localStorage.setItem(
            "messageOrder",
            JSON.stringify("The address has been updated!")
          );
          window.location.href = "/my-orders";
        });
    }
  }

  function cancelOrder(id) {
    Swal.fire({
      text: "Do you want to cancel the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient.delete(`/orders/${id}`, order).then((res) => {
          localStorage.setItem(
            "messageOrder",
            JSON.stringify(res.data.message)
          );
          window.location.href = "/my-orders";
        });
      }
    });
  }

  return (
    <section className="flex w-full h-full gap-5 p-3 bg-white rounded-lg shadow-md">
      <section className="flex flex-col space-y-1">
        <div className="flex items-center gap-5">
          <i className="ri-price-tag-3-fill"></i>
          <p className="text-[15px]">{_id}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-calendar-fill"></i>
          <p className="text-[15px]">{order_date}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-money-dollar-circle-fill"></i>
          <p className="text-[15px]">$ {total}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-home-2-fill"></i>
          <p className="text-[15px]">{address}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-progress-1-line"></i>
          <p
            className={`${
              status === "In line"
                ? "bg-gray-400"
                : status === "Preparing"
                ? "bg-yellow-400"
                : status === "Delivering"
                ? "bg-blue-400"
                : "bg-green-400"
            } text-[15px] inline-block py-0.5 px-2 rounded-md text-white font-semibold `}
          >
            {status}
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-around">
        <button
          onClick={() => watchOrderDetails(order)}
          className="py-0.5 px-1.5 bg-gray-300 rounded-md"
        >
          <i className="ri-eye-fill"></i>
        </button>
        <button
          onClick={() => editOrder(_id)}
          className="py-0.5 px-1.5 bg-blue-300 rounded-md"
        >
          <i className="ri-pencil-fill text-normal"></i>
        </button>
        <button
          onClick={() => cancelOrder(_id)}
          className="py-0.5 px-1.5 bg-red-300 rounded-md"
        >
          <i className="ri-delete-bin-fill text-normal"></i>
        </button>
      </section>
    </section>
  );
}

export default OrderCardMobile;
