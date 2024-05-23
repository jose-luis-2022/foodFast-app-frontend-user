import { useContext, useState } from "react";
import { AppContext } from "../../../context/appContext";
import axiosClient from "../../config/axios";

function ReservationEdit({ reservationToUpdate }) {
  const {
    _id,
    reservation_date: previousReservationDate,
    reservation_time: previousReservationTime,
    suggestions: previousSuggestions,
  } = reservationToUpdate;
  const { isOpenReservationEdit, setIsOpenReservationEdit } =
    useContext(AppContext);
  const previousReservationDateFormated = previousReservationDate.split("/");
  const [dateUpdated, setDateUpdated] = useState(previousReservationDate);
  const [timeUpdated, setTimeUpdated] = useState(previousReservationTime);
  const [suggestionsUpdated, setSuggestionsUpdated] =
    useState(previousSuggestions);

  async function updateReservation(_id) {
    setDateUpdated(document.getElementById("date").value);
    setTimeUpdated(document.getElementById("time").value);
    setSuggestionsUpdated(document.getElementById("suggestions").value);
    const newReservationDateFormated = dateUpdated.split("-");

    const reservationUpdated = {
      reservation_date: `${newReservationDateFormated[2]}/${newReservationDateFormated[1]}/${newReservationDateFormated[0]}`,
      reservation_time: timeUpdated,
      suggestions: suggestionsUpdated,
    };

    await axiosClient
      .patch(`/reservations/${_id}`, reservationUpdated)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            "messageReservation",
            JSON.stringify(res.data.message)
          );
          window.location.href = "/my-reservations";
        }
      });
  }

  return (
    <div
      className={`${
        isOpenReservationEdit ? "absolute" : "hidden"
      } w-10/12 md:w-3/12 md:h-3/5 md:left-48 md:right-0 top-48 left-8 md:top-32 md:m-auto p-5 bg-white opacity-95 shadow rounded-lg`}
    >
      <div className="w-full flex justify-between p-3 border-b-[1px] border-gray-400">
        <p className="text-lg font-semibold">Edit Reservation</p>
        <button
          className="hover:scale-110 duration-500"
          onClick={() => setIsOpenReservationEdit(false)}
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
      <div className="mt-5 space-y-5 px-5 py-5">
        <div className="w-full flex justify-center gap-3">
          <p>Reservation Date</p>
          <input
            id="date"
            type="date"
            defaultValue={`${previousReservationDateFormated[2]}-${
              previousReservationDateFormated[1].length < 2
                ? "0" + previousReservationDateFormated[1]
                : previousReservationDateFormated[1]
            }-${previousReservationDateFormated[0]}`}
            className="text-gray-700"
            onChange={(e) => setDateUpdated(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center gap-3">
          <p>Reservation Time</p>
          <select
            name="time"
            id="time"
            value={`${previousReservationTime}`}
            onChange={(e) => setTimeUpdated(e.target.value)}
          >
            <option value="6:00 pm">6:00 pm</option>
            <option value="6:30 pm">6:30 pm</option>
            <option value="7:00 pm">7:00 pm</option>
            <option value="7:30 pm">7:30 pm</option>
            <option value="8:00 pm">8:00 pm</option>
            <option value="8:30 pm">8:30 pm</option>
            <option value="9:00 pm">9:00 pm</option>
          </select>
        </div>
        <div className="flex flex-col justify-center space-y-3">
          <p className="text-center">Suggestions</p>
          <textarea
            name="suggestions"
            id="suggestions"
            rows="3"
            className="w-10/12 mx-auto border-2 border-gray-200 p-3"
            defaultValue={previousSuggestions}
            onChange={(e) => setSuggestionsUpdated(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={() => updateReservation(_id)}
            disabled={
              dateUpdated === previousReservationDate &&
              timeUpdated === previousReservationTime &&
              suggestionsUpdated === previousSuggestions
            }
            className="bg-yellow-300 flex items-center justify-center px-3 py-2 rounded-md text-sm font-bold hover:scale-[103%] duration-500"
          >
            <div className="flex items-center gap-2">
              <i className="ri-bank-card-fill"></i>
              <p>Save</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationEdit;
