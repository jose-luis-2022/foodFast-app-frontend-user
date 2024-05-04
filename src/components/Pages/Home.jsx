import React, { useEffect, useState, Fragment } from "react";
import axiosClient from "../../config/axios";
import ProductCard from "../products/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  const apiQuery = async () => {
    const response = await axiosClient.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    apiQuery();
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
