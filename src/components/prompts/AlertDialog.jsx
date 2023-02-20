import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createUser } from "../services/createUser";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  redirect,
  useNavigate,
} from "react-router-dom";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
    const email = data.get("email");
    const lastName = data.get("lastName");
    const firstName = data.get("firstName");
    const password = data.get("password");
    const profileObject = {
      email: email,
      lastName: lastName,
      firstName: firstName,
      password: password,
    };

    createUser(profileObject);
  };

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Jam Session Sign Up"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thanks for signing up!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
