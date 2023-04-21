import { Link, useLocation } from "react-router-dom";
import { linkItems } from "../model/link";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../model/theme";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "../style/SideNav.scss";

const SideNav = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{ borderRight: 1, borderColor: "#888", paddingY: 1, paddingX: 0.5 }}
      >
        <Stack spacing={0.5}>
          {linkItems.map((item, index) => (
            <Link className="link" key={index} to={item.path}>
              <Button
                className="btn"
                color="inherit"
                variant="text"
                startIcon={item.icon}
              >
                <div className="name">{item.name}</div>
              </Button>
            </Link>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default SideNav;
