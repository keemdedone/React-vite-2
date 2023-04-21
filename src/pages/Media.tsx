import React from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

import { ThemeProvider } from "@mui/material";
import { darkTheme } from "../model/theme";
import { backend_url } from "../model/link";

import "../style/Media.scss";

const Media = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ padding: "10px", display: "flex", gap: "15px" }}>
        <CardActionArea className="card-box">
          <CardMedia
            component="img"
            width="100%"
            image={backend_url + "/images/Steins;Gate.jpg"}
          />
          <CardContent className="card-content">
            <Box
              sx={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <b className="content-name">Animation Name</b>
              <span className="content-episode">24 episodes</span>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
    </ThemeProvider>
  );
};

export default Media;
