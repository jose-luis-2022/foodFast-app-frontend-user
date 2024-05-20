import { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";

function ReservationRow({ reservation, setReservationToUpdate }) {
  const {
    _id,
    client,
    suggestions,
    reservation_date,
    reservation_time
  } = reservation;

  const { setIsOpenReservationEdit } = useContext(AppContext);

  function editReservation(reservation) {
    setReservationToUpdate(reservation);
    setIsOpenReservationEdit(true);
  }

  function cancelReservation(id) {
    Swal.fire({
      text: "Do you want to cancel your reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient.delete(`/reservations/${id}`, reservation).then((res) => {
          localStorage.setItem(
            "messageReservation",
            JSON.stringify(res.data.message)
          );
          window.location.href = "/my-reservations";
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
        <p className="text-sm font-semibold">{reservation_date}</p>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">{reservation_time}</p>
      </td>
      <td className="text-center">
        <p className="text-sm font-semibold">{suggestions}</p>
      </td>
    
      <td className="flex justify-center space-x-3">
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
      </td>
    </tr>
  );
}

export default ReservationRow;
