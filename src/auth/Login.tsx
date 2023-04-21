import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../model/theme";
import { backend_url } from "../model/link";

import "../style/Auth.scss";

const login = (props: any) => {
  const [loginForm, setLoginForm] = useState<any>({
    uName: "",
    uPassword: "",
  });

  const loginChange = (ev: any) => {
    setLoginForm({
      ...loginForm,
      [ev.target.name]: ev.target.value,
    });
  };

  const loginSend = (ev: any) => {
    ev.preventDefault();
    const formData = loginForm;
    fetch(`${backend_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          props.onLogin(JSON.parse(result));
        } else {
          alert("Login fail. " + result);
        }
      })
      .catch((error) => {
        alert("Error login submitting form : " + error);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundColor: "var(--dark-bg)",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          component={"form"}
          onChange={loginChange}
          onSubmit={loginSend}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            width: "100%",
          }}
        >
          <Typography className="title" textAlign="center" variant="h3">
            LOGIN
          </Typography>

          <input
            id="user-name"
            className="login-input"
            name="uName"
            placeholder="User name"
            type="text"
            required
          />

          <input
            id="user-password"
            className="login-input"
            name="uPassword"
            placeholder="Password"
            type="password"
            required
          />

          <Stack spacing={2} justifyContent="center" marginTop={2}>
            <Button
              variant="contained"
              color="info"
              type="submit"
              sx={{
                fontSize: "24px",
                textTransform: "inherit",
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Log in
            </Button>
            <Link className="register-btn" to="/register">
              No user account ?
            </Link>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default login;
