import { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function ProductDetails({ orderDetail }) {
  const { order, suggestions } = orderDetail;
  const { isOpenProductDetails, setIsOpenProductDetails } =
    useContext(AppContext);

  const renderProductsDetails = order.map((product) => {
    return (
      <div key={product._id} className="flex justify-between items-center mx-5 border-b-[0.5px] border-gray-100">
        <div className="flex justify-center items-center gap-2 w-3/4">
          <img
            className="h-24"
            src={product.product.img_url}
            alt={product.product.img}
          />
          <h3 className="font-semibold">{product.product.name}</h3>
        </div>
        <div className="w-1/4 flex justify-center">
          <p className="text-sm font-bold">{product.quantity}</p>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`${
        isOpenProductDetails ? "absolute" : "hidden"
      } w-4/12 h-3/5 left-48 right-0 top-32 m-auto p-5 bg-white opacity-95 shadow rounded-lg`}
    >
      <div className="w-full flex justify-between p-3 border-b-[1px] border-gray-400">
        <p className="text-lg font-semibold">Order Detail</p>
        <button className="hover:scale-110 duration-500" onClick={() => setIsOpenProductDetails(false)}>
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
      <div className="mt-5 space-y-3 px-5">
        <p className="text-normal font-semibold">Products</p>
        <div className="flex items-center mx-5">
          <div className="w-3/4 text-center">
            <p className="text-xs uppercase text-gray-900 font-semibold">
              Product
            </p>
          </div>
          <div className="w-1/4 text-center">
            <p className="text-xs uppercase text-gray-900 font-semibold">
              Quantity
            </p>
          </div>
        </div>
        <div className="max-h-[100px] overflow-y-scroll">
          {renderProductsDetails}
        </div>
        <div className="w-full space-y-5">
          <p className="text-normal font-semibold">Suggestions</p>
          <textarea
            disabled
            className="placeholder:text-gray-900 border-2 border-gray-200 w-full p-3"
            type="text"
            placeholder={suggestions}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
