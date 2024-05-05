import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsCart, setProductsCart] = useState(
    localStorage.getItem("productsCart")
      ? JSON.parse(localStorage.getItem("productsCart"))
      : []
  );
  const messageCart = localStorage.getItem("messageCart")
    ? JSON.parse(localStorage.getItem("messageCart"))
    : "";
  const messageOrder = localStorage.getItem("messageOrder")
    ? JSON.parse(localStorage.getItem("messageOrder"))
    : "";
  const [isConfirmCart, setIsConfirmCart] = useState(false);
  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        productsCart,
        setProductsCart,
        messageCart,
        messageOrder,
        isConfirmCart,
        setIsConfirmCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
