import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/appContext";
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";
import Loader from "../tools/Loader";
import MessageMixin from "../tools/MessageMixin";
import ReservationRow from "../Reservations/ReservationRow";
import ReservationEdit from "../Reservations/ReservationEdit";
import ReservationCardMobile from "../Reservations/ReservationCardMobile";
import ReservationDetailMobile from "../Reservations/ReservationDetailMobile";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const { messageReservation, isOpenReservationEdit, isOpenReservationDetail } =
    useContext(AppContext);
  const [reservationToUpdate, setReservationToUpdate] = useState({});
  const [reservationDetail, setReservationDetail] = useState({});
  const _id = localStorage.getItem("_id");

  const apiQuery = async () => {
    const response = await axiosClient.get("/reservations");
    if (response.data.length > 0) {
      setReservations(
        response.data.filter((reservation) => reservation.client._id === _id)
      );
    } else {
      setReservations([]);
    }
    setLoadingReservations(false);
  };

  useEffect(() => {
    setTimeout(function () {
      apiQuery();
    }, 1000);
    if (messageReservation) {
      MessageMixin(messageReservation);
      localStorage.removeItem("messageReservation");
    }
  }, []);

  const loadingSection = () => {
    if (loadingReservations) {
      if (reservations.length === 0) {
        return <Loader />;
      }
    }
  };

  async function createReservation() {
    await Swal.fire({
      customClass: {
        title: "text-[20px]",
        confirmButton: "px-4 py-1",
        cancelButton: "px-4 py-1",
      },
      titleText: "Reservation Details",
      html: `
          <div class="flex gap-5 my-3 justify-center text-[16px]">
            <label for="date" class="font-semibold">Reservation Date</label>
            <input type="date" id="date">
          </div>
          <div class="flex gap-5 my-3 justify-center text-[16px]">
            <label class="font-semibold">Reservation Time</label>
            <select id="time">
                <option value="null">-- Select a time --</option>
                <option value="6:00 pm">6:00 pm</option>
                <option value="6:30 pm">6:30 pm</option>
                <option value="7:00 pm">7:00 pm</option>
                <option value="7:30 pm">7:30 pm</option>
                <option value="8:00 pm">8:00 pm</option>
                <option value="8:30 pm">8:30 pm</option>
                <option value="9:00 pm">9:00 pm</option>
            </select>
          </div>
          <div class="flex flex-col space-y-5 text-[16px]">
            <label class="font-semibold">Suggestions</label>
            <textarea id="suggestions" rows="3" class="w-9/12 mx-auto border-2 border-gray-200 p-3"></textarea>
          </div>
        `,
      focusConfirm: false,
      confirmButtonText: "Save",
      confirmButtonColor: "#9DA976",
      showCancelButton: true,
      preConfirm: async () => {
        const date = new Date(
          `${document.getElementById("date").value}T00:00:00`
        ).toLocaleDateString();
        const time = document.getElementById("time").value;
        const suggestions = document.getElementById("suggestions").value;

        if (!document.getElementById("date").value || !time || !suggestions) {
          return Swal.showValidationMessage(`All fields are required.`);
        } else {
          const reservation = {
            client: _id,
            suggestions: suggestions,
            reservation_date: date,
            reservation_time: time,
          };

          await axiosClient
            .post("/reservations", reservation, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res.status === 201) {
                localStorage.setItem(
                  "messageReservation",
                  JSON.stringify(res.data.message)
                );
                window.location.href = "/my-reservations";
              }
            });
        }
      },
    });
  }

  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <main className="w-full flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:w-[85%] my-10 font-Mulish space-y-10">
          <h1 className="text-2xl text-center font-bold opacity-90">
            My Reservations
          </h1>
          <button
            onClick={() => createReservation()}
            className="flex gap-2 justify-center items-center px-2 py-1 rounded-md bg-[#90caf9] text-white text-sm font-semibold hover:scale-105 duration-700 ml-5 md:ml-0"
          >
            <i className="ri-add-line"></i>
            <p>Reservation</p>
          </button>
          <div
            className={`${
              reservations.length === 0 ? "hidden" : "flex"
            } p-5 bg-white w-11/12 mx-auto max-h-[500px] overflow-y-scroll`}
          >
            <table className="w-full hidden md:block">
              <tbody>
                <tr>
                  <th className="w-[15%] text-xs uppercase text-gray-600">
                    Reservation number
                  </th>
                  <th className="w-[20%] text-xs uppercase text-gray-600">
                    Date
                  </th>
                  <th className="w-[20%] text-xs uppercase text-gray-600">
                    Time
                  </th>
                  <th className="w-[25%] text-xs uppercase text-gray-600">
                    Suggestions
                  </th>
                  <th className="w-[20%] text-xs uppercase text-gray-600">
                    Options
                  </th>
                </tr>
                {reservations.map((reservation) => (
                  <ReservationRow
                    key={reservation._id}
                    reservation={reservation}
                    setReservationToUpdate={setReservationToUpdate}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex flex-col mx-auto space-y-1 md:hidden py-2 overflow-y-scroll">
              {reservations.map((reservation) => (
                <ReservationCardMobile
                  key={reservation._id}
                  reservation={reservation}
                  setReservationDetail={setReservationDetail}
                  setReservationToUpdate={setReservationToUpdate}
                />
              ))}
            </div>
          </div>
          <div
            className={`${
              loadingReservations ? "flex" : "hidden"
            } justify-center py-20`}
          >
            {loadingSection()}
          </div>
          {isOpenReservationEdit && (
            <ReservationEdit reservationToUpdate={reservationToUpdate} />
          )}
          {isOpenReservationDetail && (
            <ReservationDetailMobile suggestions={reservationDetail} />
          )}
          <div
            className={`${
              reservations.length === 0 && !loadingReservations
                ? "flex"
                : "hidden"
            } w-full justify-center items-center h-[50vh]`}
          >
            <div className="flex flex-col justify-center items-center space-y-3">
              <i className="ri-information-line text-4xl text-blue-200"></i>
              <p className="text-lg">There're not reservations yet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyReservations;
