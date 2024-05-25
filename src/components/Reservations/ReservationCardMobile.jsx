import { useContext } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import { AppContext } from "../../../context/appContext";

function OrderCardMobile({
  reservation,
  setReservationDetail,
  setReservationToUpdate,
}) {
  const { _id, client, suggestions, reservation_date, reservation_time } =
    reservation;
  const { setIsOpenReservationEdit, setIsOpenReservationDetail } =
    useContext(AppContext);

  async function watchReservationDetails(suggestions) {
    setReservationDetail(suggestions);
    setIsOpenReservationDetail(true);
  }

  async function editReservation(reservation) {
    setReservationToUpdate(reservation);
    setIsOpenReservationEdit(true);
  }

  function cancelReservation(id) {
    Swal.fire({
      customClass: {
        title: "text-[20px]",
        confirmButton: "px-4 py-1",
        cancelButton: "px-4 py-1",
      },
      text: "Do you want to cancel your reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient
          .delete(`/reservations/${id}`, {
            reservation,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            localStorage.setItem(
              "messageReservation",
              JSON.stringify(response.data.message)
            );
            window.location.href = "/my-reservations";
          });
      }
    });
  }

  return (
    <section className="flex justify-around w-full h-full gap-5 py-2 px-1 bg-white shadow-md">
      <section className="flex flex-col space-y-1">
        <div className="flex items-center gap-5">
          <i className="ri-price-tag-3-fill"></i>
          <p className="text-[14px]">{_id}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-calendar-fill"></i>
          <p className="text-[14px]">{reservation_date}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="ri-time-line"></i>
          <p className="text-[14px]">{reservation_time}</p>
        </div>
      </section>
      <section className="flex flex-col text-sm justify-around">
        <button
          onClick={() => watchReservationDetails(suggestions)}
          className="py-0.5 px-1.5 bg-gray-300 rounded-md"
        >
          <i className="ri-eye-fill"></i>
        </button>
        <button
          onClick={() => editReservation(reservation)}
          className="py-0.5 px-1.5 bg-blue-300 rounded-md"
        >
          <i className="ri-pencil-fill text-normal"></i>
        </button>
        <button
          onClick={() => cancelReservation(_id)}
          className="py-0.5 px-1.5 bg-red-300 rounded-md"
        >
          <i className="ri-delete-bin-fill text-normal"></i>
        </button>
      </section>
    </section>
  );
}

export default OrderCardMobile;
