import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import FormDialog from "./FormDialog";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const rows = [
  createData(0, "16 Mar, 2020", "Low-Fi Beats", "Guitar", 312),
  createData(1, "16 Dec, 2022", "GR8Full DED", "Bass", 840),
];

export default function ContentCard({ title, userID }) {
  const [instruments, setInstruments] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      `https://jamsession-cs467-w2023.uw.r.appspot.com/users/${userID}/instruments`,
      options
    )
      .then((response) => response.json())
      .then((data) => setInstruments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Instrument</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Years Played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <FormDialog userID={userID} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
