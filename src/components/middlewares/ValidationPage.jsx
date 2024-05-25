import { useEffect } from "react";
import axiosClient from "../../config/axios";
import { useNavigate, useLocation } from "react-router-dom";

const ValidationPage = ({children}) => {
  const data = {
    token: localStorage.getItem("token"),
    _id: localStorage.getItem("_id"),
  };
  const navigateTo = useNavigate();
  let location = useLocation();

  async function loadingPage() {
    try {
      await axiosClient.post("/auth/validation", data);
      navigateTo(location.pathname);
    } catch (error) {
      if(localStorage.getItem("productsCart")) {
        localStorage.removeItem("productsCart");
      }
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      if (localStorage.getItem("_id")) {
        localStorage.removeItem("_id");
      }
      navigateTo("/login");
    }
  }

  useEffect(() => {
    loadingPage();
  }, []);

  return children;
};

export default ValidationPage;
