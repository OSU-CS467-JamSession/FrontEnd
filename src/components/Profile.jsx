import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from './SignUp';
import {getAllUsers} from './services/getUsers'
import { BrowserRouter as Router, Switch, 
  Route, redirect,  useNavigate} from "react-router-dom";
  import { useLocation} from "react-router-dom";

const theme = createTheme();

//TODO need to implement React Router set up to render various pages
// SignIn should call SignUp when link is hit

export default function Profile() {

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  console.log(state);

  const emailProfile = state.email;
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/k3heD_KwH0A)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <MusicNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile: 
          </Typography>
      
            <Typography component="h1" variant="h2">
               {emailProfile}'s profile
            </Typography>
          </Box>
        </Grid>
    </ThemeProvider>
  );
}