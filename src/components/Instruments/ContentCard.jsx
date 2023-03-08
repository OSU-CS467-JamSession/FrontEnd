import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import FormDialog from "./FormDialog";

// Generate Order Data
function createData(name, type) {
  return { name, type };
}

function preventDefault(event) {
  event.preventDefault();
}

const rows = [
  createData(0, "16 Mar, 2020", "Low-Fi Beats", "Guitar", 312),
  createData(1, "16 Dec, 2022", "GR8Full DED", "Bass", 840),
];

export default function ContentCard({ title, userID }) {
  const [userAttributes, setUserAttributes] = useState([]);
  const [attributeAdded, setAttributeAdded] = useState(false);

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
      .then((data) => setUserAttributes(data._embedded.instruments))
      .catch((err) => console.error(err));
  }, [attributeAdded]);

  return (
    console.log(userAttributes),
    (
      <React.Fragment>
        <Title>{title}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Instrument</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Years Played</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAttributes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell></TableCell>

                <FormDialog
                  userID={userID}
                  setAttributeAdded={setAttributeAdded}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  );
}
