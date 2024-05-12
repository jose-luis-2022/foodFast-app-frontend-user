import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex sm:flex-col mx-auto my-5 sm:my-0 sm:justify-center items-center sm:h-[90vh] sm:w-72 lg:w-3/12 font-Mulish">
      <h2 className="hidden sm:block md:text-lg font-bold opacity-90 sm:mb-10">Control Panel</h2>
      <ul className="flex sm:flex-col sm:space-y-5 text-sm sm:text-normal text-gray-900">
        <li>
          <Link
            to={"/"}
            className="flex items-center gap-2 hover:scale-[103%] duration-200 px-2 py-1"
          >
            <i className="ri-drinks-line"></i>
            <p>Products</p>
          </Link>
        </li>
        <li>
          <Link
            to={"/my-orders"}
            className="flex items-center gap-2 hover:scale-[103%] duration-200 px-2 py-1"
          >
            <i className="ri-layout-2-line"></i>
            <p>Orders</p>
          </Link>
        </li>
        <li>
          <Link
            to={"/my-reservations"}
            className="flex items-center gap-2 hover:scale-[103%] duration-200 px-2 py-1"
          >
            <i className="ri-calendar-event-line"></i>
            <p>Reservations</p>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
