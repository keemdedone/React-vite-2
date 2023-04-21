import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "./component/AppBar";
import Footer from "./component/Footer";
import SideNav from "./component/SideNav";
import MailPage from "./pages/Mail";
import CrudPage from "./pages/Crud";
import MediaPage from "./pages/Media";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";

import Box from "@mui/material/Box";

import { login } from "./model/user";
import { backend_url } from "./model/link";

import "./App.scss";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const storedLoginStatus = localStorage.getItem("isLoggedIn") || undefined;

  const handleLogin = (response: login) => {
    if (response) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", response.token);
    }
  };

  const handleLogout = () => {
    location.reload();
  };

  const checkTokenSession = () => {
    if (storedLoginStatus !== undefined) {
      stillLogin(storedLoginStatus);
    } else {
      setIsLoggedIn(false);
    }
  };

  const stillLogin = (token: string) => {
    setLoading(false);
    fetch(`${backend_url}/user/still`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stCode: token }),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result == "yes") {
          setIsLoggedIn(true);
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        alert("Error check still login : " + error);
      });
  };

  useEffect(() => {
    checkTokenSession();
  }, [loggedIn]);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        {!loading ? (
          <Box>Loading...</Box>
        ) : !loggedIn ? (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        ) : (
          <div className="App">
            <div className="header">
              <AppBar
                data={storedLoginStatus ? storedLoginStatus : undefined}
                onLogout={handleLogout}
              />
            </div>
            <div className="content">
              <SideNav />
              <div className="route-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/crud" />} />
                  <Route path="*" element={<Navigate to="/crud" />} />
                  <Route path="/crud" element={<CrudPage />} />
                  <Route path="/mail" element={<MailPage />} />
                  <Route path="/media" element={<MediaPage />} />
                </Routes>
              </div>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
