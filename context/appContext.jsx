import React from "react";

export const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [productsCart, setProductsCart] = React.useState(localStorage.getItem("productsCart")? JSON.parse(localStorage.getItem("productsCart")) : []);

  return (
    <AppContext.Provider value={{ productsCart, setProductsCart }}>
      {children}
    </AppContext.Provider>
  );
}
