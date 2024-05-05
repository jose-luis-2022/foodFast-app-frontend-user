import React, { useEffect, useContext } from "react";
import axiosClient from "../../config/axios";
import ProductCard from "../products/ProductCard";
import { AppContext } from "../../../context/appContext";
import MessageMixin from "../tools/MessageMixin";

function Home() {
  const { products, setProducts, productsCart, messageCart} =
    useContext(AppContext);

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
  };
  
  useEffect(() => {
    apiQuery();
    if (messageCart) {
      MessageMixin(messageCart);
      localStorage.removeItem("messageCart");
    }
  }, []);

  return (
    <div className="my-5 font-Mulish space-y-5">
      <h1 className="text-xl text-center font-semibold">Products</h1>
      <div className="grid grid-cols-5 gap-5 h-[550px] overflow-y-scroll scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
