import * as React from 'react';
import { useEffect} from "react";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Search } from '@mui/icons-material';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { isRouteErrorResponse, useLocation, useNavigate } from 'react-router-dom';

export default function SearchUsersForm() {
  const [experience, setExperience] = React.useState('');
  const [instrument, setInstrument] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [data, setData] = React.useState();
  const [instruments, setInstruments] = React.useState();
  const [genres, setGenres] = React.useState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeExperience = (event) => {
    setExperience(event.target.value);
    setInstrument('');
    setGenre('');
  };

  const handleChangeInstrument = (event) => {
    setExperience('');
    setInstrument(event.target.value);
    setGenre('');
  };

  const handleChangeGenre = (event) => {
    setExperience('');
    setInstrument('');
    setGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/Users?experience=${experience}&instrument=${instrument}&genre=${genre}`, {state: location.state});
  }

  let tableHeaders = ["Name", "Email", "Experience", "Location"];

  const experienceMap = ["N/A", "Novice", "Advanced Beginner", "Competent", "Proficient", "Expert"]

  const generateInstrumentsMenu = (data) => {
    if(data) {
      data.sort(((a, b) => a.name.localeCompare(b.name)));
      return (
        <Select
          label="Instrument"
          name="instrument"
          id="instrument"
          value={instrument}
          onChange={handleChangeInstrument}
        >
          {data.map((obj) => (
            <MenuItem 
              key={obj.instrument_id}
              value={obj.instrument_id}
            >{obj.name}</MenuItem>
          ))}
        </Select>
      )
    }
  }

  const generateGenresMenu = (data) => {
    if(data) {
      data.sort(((a, b) => a.name.localeCompare(b.name)));
      return (
        <Select
          label="Genre"
          name="genre"
          id="genre"
          value={genre}
          onChange={handleChangeGenre}
        >
          {data.map((obj) => (
            <MenuItem 
              key={obj.genre_id}
              value={obj.genre_id}
            >{obj.name}</MenuItem>
          ))}
        </Select>
      )
    }
  }

  const generateUsersTable = (data) => {
    if(data) {
      data.sort(((a, b) => a.name_first.localeCompare(b.name_first)));
      console.log(data);
      return (
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={tableHeaders.indexOf(header)}>{header}</TableCell>
              ))}
            </TableRow>
            {data.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  {user.name_first + " " + user.name_last}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {experienceMap[user.experience]}
                </TableCell>
                <TableCell>
                  {user.location_city + ", " + user.location_state}
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
          
        </Table>
      )
    }
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    let fetchUrl = "";
    if(experience) {
      fetchUrl = `https://jamsession-cs467-w2023.uw.r.appspot.com/users/search/findByExperienceGreaterThanEqual?experience=${experience}`
    }
    else if(instrument) {
      fetchUrl = `https://jamsession-cs467-w2023.uw.r.appspot.com/instruments/${instrument}/users`
    }
    else if(genre) {
      fetchUrl = `https://jamsession-cs467-w2023.uw.r.appspot.com/genres/${genre}/users`
    }
    else {
      fetchUrl = null;
    }

    if(fetchUrl) {
      fetch(
        fetchUrl,
        options
      )
      .then((response) => response.json())
      .then((response) => setData(response._embedded.users))
      .catch((err) => console.error(err));  
    }

    fetch(
      "https://jamsession-cs467-w2023.uw.r.appspot.com/instruments?size=250",
      options
    )
    .then((response) => response.json())
    .then((response) => setInstruments(response._embedded.instruments))
    .catch((err) => console.error(err));

    fetch(
      "https://jamsession-cs467-w2023.uw.r.appspot.com/genres?size=100",
      options
    )
    .then((response) => response.json())
    .then((response) => setGenres(response._embedded.genres))
    .catch((err) => console.error(err));

  }, [experience, instrument, genre]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="experience-label">Experience</InputLabel>
            <Select
              label="Experience"
              name="experience"
              id="experience"
              value={experience}
              onChange={handleChangeExperience}
            >
              <MenuItem value={1}>Novice</MenuItem>
              <MenuItem value={2}>Advanced Beginner</MenuItem>
              <MenuItem value={3}>Competent</MenuItem>
              <MenuItem value={4}>Proficient</MenuItem>
              <MenuItem value={5}>Expert</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="instrument-label">Instrument</InputLabel>
            {generateInstrumentsMenu(instruments)}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="instrument-label">Genre</InputLabel>
            {generateGenresMenu(genres)}
          </FormControl>
        </Grid>
      </Grid>
      {generateUsersTable(data)}
    </Paper>
  );
}