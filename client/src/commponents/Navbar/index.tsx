import { Box, Button } from "@mui/material";
import styles from "./navbar.module.scss";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    navigate("/signin");
  };

  const handleNavigation = () => {
    navigate("/chatrooms");
  };

  return (
    <nav className={styles.nav}>
      <Box className={styles.continer}>
        <h1 onClick={handleNavigation}>Real Time Chat App</h1>
        <Button className={styles.logout} onClick={handleLogOut}>
          LogOut
        </Button>
      </Box>
    </nav>
  );
}
