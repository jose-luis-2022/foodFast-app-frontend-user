import { useEffect, useContext, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import axiosClient from "../../config/axios";
import ProductCard from "../products/ProductCard";
import { AppContext } from "../../../context/appContext";
import MessageMixin from "../tools/MessageMixin";
import Loader from "../tools/Loader";

function Home() {
  const { products, setProducts, productsCart, messageCart } =
    useContext(AppContext);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const apiQuery = async () => {
    const response = await axiosClient.get("/products");
    setProducts(
      response.data.map((product) => {
        return {
          ...product,
          isSelected: productsCart.find(
            (item) => item.product._id === product._id
          )
            ? true
            : false,
        };
      })
    );
    setLoadingProducts(false);
  };

  useEffect(() => {
    setProducts([]);
    setTimeout(function () {
      apiQuery();
    }, 1000);
    if (messageCart) {
      MessageMixin(messageCart);
      localStorage.removeItem("messageCart");
    }
  }, []);

  const loadingSection = () => {
    if (loadingProducts) {
      if (products.length === 0) {
        return <Loader />;
      }
    }
  };

  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <main className="w-full flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:w-[85%] my-5 font-Mulish space-y-5">
          <h1 className="text-2xl text-center font-bold opacity-90">
            Products
          </h1>
          <div className="relative flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:h-[850px] lg:h-[550px] overflow-y-scroll scrollbar-hide">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="absolute flex py-36">{loadingSection()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
