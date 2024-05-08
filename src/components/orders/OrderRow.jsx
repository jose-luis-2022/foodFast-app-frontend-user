import {useContext} from "react";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import { AppContext } from "../../../context/appContext";

function OrderRow({ order, setOrderDetail }) {
  const {
    _id,
    client,
    address,
    total,
    order_date,
    status,
  } = order;

  const {setIsOpenProductDetails} = useContext(AppContext);

  const date = new Date(order_date);

  async function watchOrderDetails(order){
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
    <tr className="border-b-[1px] border-gray-200">
      <td className="flex items-center justify-center py-3">
        <p className="text-sm font-normal mx-3">{_id}</p>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">$ {total}</p>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">{date.toLocaleDateString()}</p>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">{address}</p>
      </td>
      <td className="text-center">
        <p
          className={`${
            status === "In line"
              ? "bg-gray-400"
              : status === "Preparing"
              ? "bg-yellow-400"
              : status === "Delivering"
              ? "bg-blue-400"
              : "bg-green-400"
          } text-sm inline-block py-0.5 px-2 rounded-md text-white font-semibold`}
        >
          {status}
        </p>
      </td>
      <td className="flex justify-center space-x-3">
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
      </td>
    </tr>
  );
}

export default OrderRow;
