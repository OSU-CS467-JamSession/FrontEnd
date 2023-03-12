import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import CreatePost from "./CreatePost";
import UserPost from "./UserPost";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import DeleteDialog from "../dashboard-components/DeleteDialog";


const API_ROUTE = "https://jamsession-cs467-w2023.uw.r.appspot.com";

export default function UserPostsContentCard({ title, userID }) {
  const [userAttributes, setUserAttributes] = useState([]);
  const [attributeAdded, setAttributeAdded] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${API_ROUTE}/users/${userID}/${title}/`, options)
      .then((response) => response.json())
      .then((data) => setUserAttributes(data[`_embedded`][`${title}`]))
      .catch((err) => console.error(err));
  }, [attributeAdded]);

  return (
    (
      <React.Fragment>
        <Title>
          {title.charAt(0).toUpperCase() + title.slice(1)}
          <CreatePost
            userID={userID}
            setAttributeAdded={setAttributeAdded}
            title={title}
          />
        </Title>
        {userAttributes.length != 0 ? (
          userAttributes.map((row) => 
          <TableBody>
          <TableRow>
            <TableCell><UserPost media={row} /></TableCell>
            <TableCell><DeleteDialog 
                    userID = {userID} 
                    row = {row} 
                    title = {title} 
                    name = {row.post_id}
                    setAttributeAdded={setAttributeAdded}
                /></TableCell>
          </TableRow>
          </TableBody>
          )
        ) 
        : (
          <TableRow>Set your {title} here!</TableRow>
        )}
      </React.Fragment>
    )
  );
}
