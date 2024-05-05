import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsCart, setProductsCart] = useState(
    localStorage.getItem("productsCart")
      ? JSON.parse(localStorage.getItem("productsCart"))
      : []
  );
  const message = localStorage.getItem("message")
    ? JSON.parse(localStorage.getItem("message"))
    : "";
  const [isConfirmCart, setIsConfirmCart] = useState(false);
  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        productsCart,
        setProductsCart,
        message,
        isConfirmCart,
        setIsConfirmCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
