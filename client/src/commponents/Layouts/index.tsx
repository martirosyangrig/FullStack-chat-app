import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { IUser } from "../../interfaces";

import styles from "./layout.module.scss";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInfo = () => {
    const userInfo: IUser  = JSON.parse(sessionStorage.getItem("user") as string);
    const { pathname } = location;

    if (userInfo && pathname === "/signin") {
      navigate("/chatrooms");
    } else if (!userInfo && pathname !== "/signin") {
      navigate("/signin");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box className={styles.wraper}>
      <Navbar />
      <Outlet />
    </Box>
  );
}
