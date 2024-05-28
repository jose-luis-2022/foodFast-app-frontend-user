import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import axiosClient from "../../config/axios";
import ProductCard from "../products/ProductCard";
import { AppContext } from "../../../context/appContext";
import MessageMixin from "../tools/MessageMixin";
import Loader from "../tools/Loader";
import ProductsFilter from "../products/ProductsFilter";
import ProductDescription from "../products/ProductDescription";

function Home() {
  const {
    products,
    setProducts,
    productsCart,
    messageCart,
    isOpenProductDescription,
  } = useContext(AppContext);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filter, setFilter] = useState("All");
  const [productDescription, setProductDescription] = useState("");

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
      <main className="relative w-full flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:w-[85%] my-5 font-Mulish space-y-5">
          <h1 className="text-2xl text-center font-bold opacity-90">
            Products
          </h1>
          <div className="w-80 overflow-x-scroll md:ml-32 flex md:w-full px-5 mx-auto md:mx-0 gap-5">
            <ProductsFilter
              filters={[
                { id: 1, filter: "All" },
                { id: 2, filter: "Sandwich" },
                { id: 3, filter: "Wraps" },
                { id: 4, filter: "Hamburguer" },
                { id: 5, filter: "Hot Dog" },
              ]}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className="relative flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:h-[450px] auto-rows-auto overflow-y-scroll scrollbar-hide">
              {filter === "All"
                ? products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      setProductDescription={setProductDescription}
                    />
                  ))
                : products
                    .filter(
                      (productFilter) => productFilter.category === filter
                    )
                    .map((productFiltered) => (
                      <ProductCard
                        key={productFiltered._id}
                        product={productFiltered}
                        setProductDescription={setProductDescription}
                      />
                    ))}
            </div>
            <div className="absolute flex py-36">{loadingSection()}</div>
          </div>
        </div>
        {isOpenProductDescription && (
          <ProductDescription description={productDescription} />
        )}
      </main>
    </div>
  );
}

export default Home;
