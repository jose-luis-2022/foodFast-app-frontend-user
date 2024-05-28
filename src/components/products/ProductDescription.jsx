import { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductDescription({ description }) {
  const { isOpenProductDescription, setIsOpenProductDescription } =
    useContext(AppContext);

  return (
    <div
      className={`${
        isOpenProductDescription ? "fixed" : "hidden"
      } w-10/12 sm:w-4/12 left-0 sm:left-48 right-0 top-60 sm:top-72 m-auto p-10 bg-white opacity-95 shadow rounded-lg`}
    >
      <div className="w-full flex justify-between p-3 border-b-[1px] border-gray-400">
        <p className="text-sm md:text-lg font-semibold">Product Detail: {description[0]}</p>
        <button
          className="hover:scale-110 duration-500"
          onClick={() => setIsOpenProductDescription(false)}
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
      <div className="mt-5 space-y-3 px-5">
        <div className="flex items-center gap-5">
          <i className="ri-restaurant-line"></i>
          <p className="text-sm md:text-normal font-semibold">Ingredients</p>
        </div>
        <div className="w-11/12 text-justify">
            <p className="text-sm md:text-normal">{description[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
