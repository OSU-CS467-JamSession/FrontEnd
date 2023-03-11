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

    console.log(data.get("title"), userID);

    const reqBody = {
      file: audioFile,
      title: data.get("title"),
      description: data.get("description"),
      user_id: userID,
    };

    console.log(reqBody);

    const options = {
      method: "POST",
      headers: { "Content-Type": "text/uri-list" },
      body: reqBody,
    };
    //TODO I'm not sure I'm using the correct endpoint here
    //keep getting a 500 error on post
    fetch(`https://jamsession-cs467-w2023.uw.r.appspot.com/posts`, options)
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
                  <Grid item xs={12}></Grid>
                </Grid>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="mp3, mpeg"
                  onChange={handleFileSelect}
                />
                <Grid container justifyContent="flex-end">
                  <Grid item></Grid>
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
