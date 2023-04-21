import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../model/theme";
import { user } from "../model/user";
import { backend_url } from "../model/link";

import "../style/Auth.scss";

const register = () => {
  const navigate = useNavigate();
  const [createForm, setCreateForm] = useState<user>({
    uID: 0,
    uName: "",
    uPassword: "",
    uEmail: "",
    uPhone: "",
  });

  const createChange = (event: any) => {
    setCreateForm({
      ...createForm,
      [event.target.name]: event.target.value,
    });
  };

  const createSend = (event: any) => {
    event.preventDefault();
    const formData = createForm;
    fetch(`${backend_url}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((text) => {
        if (text === "complete") {
          alert("Form submitted : " + text);
          navigate("/login");
        }
      })
      .catch((error) => {
        alert("Error submitting form : " + error);
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
          onChange={createChange}
          onSubmit={createSend}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            width: "100%",
          }}
        >
          <Typography className="title" textAlign="center" variant="h3">
            REGISTER
          </Typography>

          <input
            className="login-input"
            name="uName"
            placeholder="User name"
            type="text"
            autoComplete="off"
            required
          />

          <input
            className="login-input"
            name="uPassword"
            placeholder="Password"
            type="password"
            autoComplete="off"
            required
          />

          <input
            className="login-input"
            name="uEmail"
            placeholder="Email address"
            type="email"
            autoComplete="off"
            required
          />

          <input
            className="login-input"
            name="uPhone"
            placeholder="Phone number"
            type="text"
            autoComplete="off"
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
              Create account
            </Button>
            <Link className="register-btn" to="/login">
              Login
            </Link>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default register;
