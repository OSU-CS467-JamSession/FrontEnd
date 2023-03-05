import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import InstrumentButtons from "./InstrumentButtons";

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

export default function Instruments() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Instruments</Title>
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
              <InstrumentButtons />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
