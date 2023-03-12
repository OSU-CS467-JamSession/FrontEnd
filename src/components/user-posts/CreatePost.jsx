import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Typography from "@mui/material/Typography";

export default function CreatePost({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const [audioFile, setAudioFile] = React.useState();
  const [attributeID, setAttributeID] = React.useState(null);
  const { userID } = props;
  const { setAttributeAdded } = props;

  const handleFileSelect = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setAudioFile(e.target.files[0]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!audioFile) {
      return;
    }

    const data = new FormData(event.currentTarget);
    data.append("user_id", userID);
    data.append("datetime", "datetime here")

    // for (var pair in data.entries()) {
    //   console.log(pair[0], ": ", pair[1]);
    // }

    const options = {
      method: "POST",
      headers: { "Accept": "*/*", "Access-Control-Allow-Origin": "*" },
      mode: "no-cors",
      body: data,
    };

    fetch("https://jamsession-cs467-w2023.uw.r.appspot.com/posts/", options)
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
          <DialogContent>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <MusicNoteIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create a Post!
              </Typography>
              <Box
                component="form"
                encType="multipart/form-data"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      fullWidth
                      required
                      id="title"
                      label="Title"
                      autofocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      fullWidth
                      id="description"
                      label="Post Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="mp3, mpeg"
                      onChange={handleFileSelect}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}
