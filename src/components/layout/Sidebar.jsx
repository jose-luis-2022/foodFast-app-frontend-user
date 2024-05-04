import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex flex-col justify-center items-center h-[90vh] w-3/12 font-Mulish">
      <h2 className="text-md font-semibold opacity-70 mb-10">Control Panel</h2>
      <ul className="space-y-5 text-sm text-gray-700">
        <li>
          <Link to={"/"} className="flex items-center gap-2 hover:scale-[103%] duration-200 rounded-md hover:bg-gray-50 px-2 py-1">
            <i className="ri-user-3-fill"></i>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to={"/my-orders"} className="flex items-center gap-2 hover:scale-[103%] duration-200 rounded-md hover:bg-gray-50 px-2 py-1">
            <i className="ri-layout-2-fill"></i>
            <p>Orders</p>
          </Link>
        </li>
        <li>
          <Link to={"/my-reservations"} className="flex items-center gap-2 hover:scale-[103%] duration-200 rounded-md hover:bg-gray-50 px-2 py-1">
            <i className="ri-calendar-event-line"></i>
            <p>Reservations</p>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
