import "../style/AppBar.scss";
import ReactLogo from "../assets/react.svg";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBarCmp from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { backend_url } from "../model/link";

type ChildProps = {
  data: string | undefined;
};

const AppBar = (info: any) => {
  const naviagate = useNavigate();

  const logout = () => {
    if (info.data !== null) {
      const token = info.data;
      fetch(`${backend_url}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stCode: token }),
      })
        .then((response) => response.text())
        .then((text) => {
          if (text === "complete") {
            localStorage.removeItem("isLoggedIn");
            info.onLogout();
          }
        })
        .catch((error) => {
          alert("Error submitting form : " + error);
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarCmp position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              justifyItems: "center",
              display: "flex",
              gap: 1.5,
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <img src={ReactLogo} alt="React Icon" width={36} />
            <Typography variant="h5" component="div">
              REACT & VITE
            </Typography>
          </Box>
          <Stack spacing={1} direction="row">
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBarCmp>
    </Box>
  );
};

export default AppBar;
