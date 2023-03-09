import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./FormDialog";

export default function AddButton() {
  const handleSubmit = (event) => {
    event.preventDefault();

    <FormDialog />;
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} onSubmit={handleSubmit}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
