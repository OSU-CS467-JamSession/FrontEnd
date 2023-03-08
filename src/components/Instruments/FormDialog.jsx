import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContentDropDown from "./ContentDropDown";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [instrument_id, setInstrument_id] = React.useState(null);
  const { userID } = props;
  const { setAttributeAdded } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "text/uri-list" },
      body: `https://jamsession-cs467-w2023.uw.r.appspot.com/users/${userID}/instruments/${instrument_id}`,
    };

    fetch(
      `https://jamsession-cs467-w2023.uw.r.appspot.com/users/${userID}/instruments`,
      options
    )
      .then((response) => setAttributeAdded(true))
      .catch((err) => console.error(err));

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    setAttributeAdded(false),
    (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Submit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a new instrument to add
            </DialogContentText>
            <ContentDropDown updateInstrumentID={setInstrument_id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}
