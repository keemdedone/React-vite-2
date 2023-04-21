import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../model/theme";
import { useState } from "react";
import { mailBody } from "../model/mail";
import { backend_url } from "../model/link";

const Mail = () => {
  const [form, setFrom] = useState<mailBody>({
    sender: "",
    receiver: "",
    subject: "",
    text: "",
  });

  const formChange = (ev: any) => {
    setFrom({
      ...form,
      [ev.target.name]: ev.target.value,
    });
  };

  const formSend = (ev: any) => {
    ev.preventDefault();
    const formData = form;
    fetch(`${backend_url}/mail/send`, {
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
        }
      })
      .catch((error) => {
        alert("Error submitting form : " + error);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="form"
        onChange={formChange}
        onSubmit={formSend}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginY: 5,
          marginX: 10,
        }}
      >
        <TextField
          autoComplete="off"
          type="email"
          label="Sender email"
          name="sender"
          required
        />
        <TextField
          autoComplete="off"
          type="email"
          label="Receiver email"
          name="receiver"
          required
        />
        <TextField
          autoComplete="off"
          label="Topic"
          type="text"
          name="subject"
          required
        />
        <TextField
          autoComplete="off"
          label="Massage"
          name="text"
          rows={10}
          multiline
          required
        />
        <Stack spacing={1} direction="row" sx={{ justifyContent: "center" }}>
          <Button variant="outlined" color="error" type="reset">
            <RotateLeftIcon />
          </Button>
          <Button variant="outlined" color="primary" type="submit">
            <SendIcon />
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Mail;
