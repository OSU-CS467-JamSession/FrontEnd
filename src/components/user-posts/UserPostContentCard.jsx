import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import CreatePost from "./CreatePost";
import UserPost from "./UserPost";

const API_ROUTE = `https://jamsession-cs467-w2023.uw.r.appspot.com`;

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
    console.log(userID),
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
          userAttributes.map((row) => <UserPost media={row} />)
        ) : (
          <TableRow>Set your {title} here!</TableRow>
        )}
      </React.Fragment>
    )
  );
}
