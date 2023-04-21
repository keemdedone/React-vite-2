import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Check from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import { user } from "../model/user";
import { useEffect, useState } from "react";
import { backend_url } from "../model/link";

import "../style/Crud.scss";

const dialogStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "200px",
  maxWidth: "500px",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "15px",
  borderRadius: "4px",
};

const Crud = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [user, setUser] = useState<user>();
  const [openDialog, setOpenDialog] = useState<number>(0);
  const [createForm, setCreateForm] = useState<user>({
    uID: 0,
    uName: "",
    uPassword: "",
    uEmail: "",
    uPhone: "",
  });
  const [updateForm, setUpdateForm] = useState<user>({
    uID: 0,
    uName: "",
    uPassword: "",
    uEmail: "",
    uPhone: "",
  });
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [pageNo, setPageNo] = useState<number>(1);
  const itemPerPage = 5;

  const getUsers = () => {
    fetch(`${backend_url}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setPageTotal(Math.ceil(data.length / 5));
      });
  };

  const showDialog = (dialogID: number, formData?: user) => {
    if (formData) {
      if (dialogID === 2 || dialogID === 4) {
        setUser(formData);
      } else if (dialogID === 3) {
        setUpdateForm(formData);
      }
    }
    setOpenDialog(dialogID);
  };

  const closeDialog = () => {
    setOpenDialog(0);
  };

  const crateChange = (event: any) => {
    setCreateForm({
      ...createForm,
      [event.target.name]: event.target.value,
    });
  };

  const updateChange = (event: any) => {
    setUpdateForm({
      ...updateForm,
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
          closeDialog();
          getUsers();
          alert("Form submitted : " + text);
        }
      })
      .catch((error) => {
        alert("Error submitting form : " + error);
      });
  };

  const updateSend = (event: any) => {
    event.preventDefault();
    console.log(updateForm);
    const formData = updateForm;
    fetch(`${backend_url}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((text) => {
        if (text === "complete") {
          closeDialog();
          getUsers();
          alert("Form submitted : " + text);
        }
      })
      .catch((error) => {
        alert("Error submitting form : " + error);
      });
  };

  const removeSend = (userID?: number) => {
    console.log(userID);
    if (userID) {
      fetch(`${backend_url}/user/remove`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userID }),
      })
        .then((response) => response.text())
        .then((text) => {
          if (text === "complete") {
            closeDialog();
            getUsers();
            alert("Disbled user : " + text);
          }
        })
        .catch((error) => {
          alert("Error submitting form : " + error);
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, marginX: "auto", marginY: 10, overflow: "auto" }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Phone</b>
              </TableCell>
              <TableCell align="center">
                <b>Action</b>
                <Button
                  onClick={() => showDialog(1)}
                  className="btn-action"
                  color="success"
                  variant="contained"
                  autoFocus={false}
                >
                  <Add />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users
                .slice(itemPerPage * pageNo - itemPerPage, itemPerPage * pageNo)
                .map((user, index) => (
                  <TableRow
                    key={user.uID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{user.uName}</TableCell>
                    <TableCell align="center">{user.uEmail}</TableCell>
                    <TableCell align="center">{user.uPhone}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => showDialog(2, { ...user })}
                        className="btn-action"
                        color="info"
                        variant="contained"
                        autoFocus={false}
                      >
                        <SearchIcon />
                      </Button>
                      <Button
                        onClick={() => showDialog(3, { ...user })}
                        className="btn-action"
                        color="warning"
                        variant="contained"
                        autoFocus={false}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => showDialog(4, { ...user })}
                        className="btn-action"
                        color="error"
                        variant="contained"
                        autoFocus={false}
                      >
                        <RemoveIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                .concat(
                  Array(5 - (pageNo === pageTotal ? users.length % 5 : 5))
                    .fill("")
                    .map((_, index) => (
                      <TableRow
                        key={`empty_${index}`}
                        sx={{
                          border: 0,
                          height: "63px",
                        }}
                      >
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ borderColor: "#fff" }}
                        ></TableCell>
                      </TableRow>
                    ))
                )
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No user inforamtion
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box
          sx={{ marginY: "15px", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            sx={{ userSelect: "none" }}
            count={pageTotal}
            page={pageNo}
            onChange={(ev, page) => setPageNo(page)}
            shape="rounded"
          />
        </Box>
      </TableContainer>

      <Modal open={openDialog === 1} onClose={closeDialog}>
        <Box sx={dialogStyle}>
          <Typography textAlign="center" variant="h5" gutterBottom>
            User create
          </Typography>
          <Box
            component="form"
            onSubmit={createSend}
            onChange={crateChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginY: 2,
              marginX: 10,
            }}
          >
            <TextField
              autoComplete="off"
              type="text"
              label="Name"
              name="uName"
              required
            />
            <TextField
              autoComplete="off"
              type="password"
              label="Password"
              name="uPassword"
              required
            />
            <TextField
              autoComplete="off"
              type="email"
              label="Email"
              name="uEmail"
              required
            />
            <TextField
              autoComplete="off"
              type="text"
              label="Phone"
              name="uPhone"
              required
            />
            <Stack
              spacing={1.5}
              direction="row"
              sx={{ justifyContent: "center" }}
            >
              <Button
                className="btn-action"
                onClick={closeDialog}
                variant="outlined"
                color="error"
                type="reset"
              >
                <CloseIcon />
              </Button>
              <Button
                className="btn-action"
                variant="outlined"
                color="primary"
                type="submit"
              >
                <SendIcon />
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDialog === 2} onClose={closeDialog}>
        <Box sx={dialogStyle}>
          <Box sx={{ position: "absolute", right: "5px", top: "5px" }}>
            <Button
              className="btn-action"
              color="error"
              variant="text"
              onClick={closeDialog}
            >
              <CloseIcon />
            </Button>
          </Box>
          <Typography textAlign="center" variant="h5" gutterBottom>
            {user?.uName} information
          </Typography>
          <Box sx={{ marginY: 2, marginX: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                Name
              </Grid>
              <Grid item xs={10}>
                {user?.uName}
              </Grid>
              <Grid item xs={2}>
                Email
              </Grid>
              <Grid item xs={10}>
                {user?.uEmail}
              </Grid>
              <Grid item xs={2}>
                Phone
              </Grid>
              <Grid item xs={10}>
                {user?.uPhone}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDialog === 3} onClose={closeDialog}>
        <Box sx={dialogStyle}>
          <Typography textAlign="center" variant="h5" gutterBottom>
            Update {updateForm.uName}
          </Typography>
          <Box
            component="form"
            onSubmit={updateSend}
            onChange={updateChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginY: 2,
              marginX: 10,
            }}
          >
            <TextField
              autoComplete="off"
              type="text"
              label="Name"
              name="uName"
              value={updateForm.uName}
              required
            />
            <TextField
              autoComplete="off"
              type="password"
              label="Password"
              name="uPassword"
              value={updateForm.uPassword}
              required
            />
            <TextField
              autoComplete="off"
              type="email"
              label="Email"
              name="uEmail"
              value={updateForm.uEmail}
              required
            />
            <TextField
              autoComplete="off"
              type="text"
              label="Phone"
              name="uPhone"
              value={updateForm.uPhone}
              required
            />
            <Stack
              spacing={1.5}
              direction="row"
              sx={{ justifyContent: "center" }}
            >
              <Button
                className="btn-action"
                onClick={closeDialog}
                variant="outlined"
                color="error"
                type="reset"
              >
                <CloseIcon />
              </Button>
              <Button
                className="btn-action"
                variant="outlined"
                color="primary"
                type="submit"
              >
                <SendIcon />
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDialog === 4} onClose={closeDialog}>
        <Box sx={dialogStyle}>
          <Typography textAlign="center" variant="h6" gutterBottom>
            Are you sure to delete {user?.uName} ?
          </Typography>
          <Stack spacing={1} direction="row" sx={{ justifyContent: "center" }}>
            <Button
              className="btn-action"
              onClick={closeDialog}
              variant="outlined"
              color="error"
              type="reset"
            >
              <CloseIcon />
            </Button>
            <Button
              className="btn-action"
              variant="outlined"
              color="primary"
              onClick={() => removeSend(user?.uID)}
            >
              <Check />
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Crud;
