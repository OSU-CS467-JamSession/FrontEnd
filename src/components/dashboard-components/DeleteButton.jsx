import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import DeleteIcon from"@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";


export default function DeleteButton({ ...props },title,id,name,userID) {
  const handleSubmit = (event) => {
    event.preventDefault();
    <DeleteDialog />;

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleSubmit}>
        <button>delete</button>
    </Box>
  );
    }}