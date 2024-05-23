import { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ReservationDetailMobile({ suggestions }) {
  const { isOpenReservationDetail, setIsOpenReservationDetail } =
    useContext(AppContext);

  return (
    <div
      className={`${
        isOpenReservationDetail ? "absolute" : "hidden"
      } w-10/12 sm:w-4/12 left-0 sm:left-48 right-0 top-60 sm:top-32 m-auto p-5 bg-white opacity-95 shadow rounded-lg`}
    >
      <div className="w-full flex justify-between p-3 border-b-[1px] border-gray-400">
        <p className="text-lg font-semibold">Reservation Detail</p>
        <button
          className="hover:scale-110 duration-500"
          onClick={() => setIsOpenReservationDetail(false)}
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
      <div className="mt-5 flex flex-col justify-center space-y-3 px-5">
        <p className="text-normal font-semibold">Suggestions</p>
        <textarea
          name="suggestions"
          id="suggestions"
          rows="3"
          className="w-10/12 mx-auto border-2 border-gray-200 p-3"
          defaultValue={suggestions}
        ></textarea>
      </div>
    </div>
  );
}

export default ReservationDetailMobile;
