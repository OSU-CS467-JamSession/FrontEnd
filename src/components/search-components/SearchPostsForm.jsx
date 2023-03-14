import * as React from 'react';
import { useEffect} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UserPost from "../user-posts/UserPost";
import { isRouteErrorResponse, useLocation, useNavigate } from 'react-router-dom';

export default function SearchUsersForm() {
  const [experience, setExperience] = React.useState('');
  const [instrument, setInstrument] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [instruments, setInstruments] = React.useState();
  const [genres, setGenres] = React.useState();
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [pages, setPages] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLink = (event) => {
    setPage(event.target.value);
  };

  let tableHeaders = ["Name", "Location", "Email"];

  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const getPostUser = (post) => {
    fetch(`https://jamsession-cs467-w2023.uw.r.appspot.com/users/${post.user_id}`, options)
    .then((response) => response.json())
    .then((response) => users.find(item => item.user_id == post.user_id) ? 
      (null) : setUsers(orig => [...orig, response]))
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetch(
      `https://jamsession-cs467-w2023.uw.r.appspot.com/posts?page=${page}&size=3`,
      options
    )
    .then((response) => response.json())
    .then((response) => response._embedded.posts.map((i) => getPostUser(i), 
      setPosts(response._embedded.posts), setPages(response.page.total_pages)))
    .catch((err) => console.error(err));
  }, [page]);

  const buildUserInfo = (user_id) => {
    let user = users.find(user => user.user_id === user_id);

    if (!user) {
      return "Failed to fetch user info!";
    }
    else {
      return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{user.name_first + " " + user.name_last}</TableCell>
              <TableCell>{user.location_city + ", " + user.location_state}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      );
    }
  }

  const buildPageNav = (pages) => {
    let links = [];
    for(let i = 0; i<pages; i++) {
      links.push(
        <Link
          component="button"
          onClick={handleClickLink}
          value={i}
        >
          {i+1}
        </Link>
      );
    }
    return (
      <Table>
        <TableBody>
          <TableCell align="left">Pages</TableCell>
          {links.map((link) => (<TableCell align="right">{link}</TableCell>))}
        </TableBody>
      </Table>
    )
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {posts.map((row) => 
        <Grid item xs={12} key={row.post_id}>
          {buildUserInfo(row.user_id)}
          <UserPost media={row} />
        </Grid>)}
      </Grid>
      
      {buildPageNav(pages)}
    </Paper>
  );
}