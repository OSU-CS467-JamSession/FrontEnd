import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import Chart from './MyPosts';
import Deposits from './Instruments';
import Orders from './UserPosts';
import { BrowserRouter as Router, Switch, 
  Route, redirect,  useNavigate} from "react-router-dom";
  import { useLocation} from "react-router-dom";
import { getThisUserQ } from './services/getThisUser';
import { Button, getAccordionDetailsUtilityClass } from '@mui/material';
import {useEffect, useState} from 'react';
import { getInstrumentsByUserQ } from './services/getInstrumentsByUser';
import { getGenresByUserQ } from './services/getGenresByUser';
import { deleteThisUserQ } from './services/deleteThisUser';
import TextField from "@mui/material/TextField";
import { createInstrument } from './services/createInstrument';
import { getAllInstrumentsQ } from './services/getAllInstruments';
import { addInstrumentsForThisUserQ } from './services/addInstrumentForThisUser';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [user, setUser] = React.useState(null);
  var [instruments, setInstruments] = React.useState(null);
  const [genres, setGenres] = React.useState(null);
  const [allInstruments, setAllInstruments] = React.useState(null);

  useEffect(() => {
    getThisUserQ(state)
      .then(result => setUser(result))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getInstrumentsByUserQ(state)
      .then(result => setInstruments(result))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getGenresByUserQ(state)
      .then(result => setGenres(result))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getAllInstrumentsQ(state)
      .then(result => setAllInstruments(result._embedded.instruments))
      .catch(err => console.error(err));
  }, []);

  if (user === null) return <div>loading...</div>;
  if (instruments === null) return <div>loading...</div>;
  if (genres === null) return <div>loading...</div>;
  if (allInstruments === null) return <div>loading...</div>;
  
  console.log(user)
  console.log(instruments)
  console.log(genres)
  console.log(allInstruments)

  const allInstNames = allInstruments.name
  const allInstId = allInstruments.instrument_id

  const delUser = () => {
    console.log('delete this user')
    deleteThisUserQ(user.user_id)
    navigate('/')
}

const addInst = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const instrument = data.get('instrument')
  const string_user = JSON.stringify(user.user_id)
  const string_inst = JSON.stringify(instrument)

  var cur_inst = []

  var arrayLength = instruments.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log("cure", instruments[i].name);
        cur_inst.push(instruments[i]._links.instrument.href)
    }
  console.log('add instrument for this user',string_user, instrument)

  cur_inst.push(instrument)
  addInstrumentsForThisUserQ( string_user,cur_inst)

  // set new array of instruments
  getInstrumentsByUserQ(state)
  .then(result => setInstruments(result))
  .catch(err => console.error(err));

}

const addGenre = () => {
  console.log('add genre for this user')
}

const createGenre = () => {
  console.log('create a genre')
}

const createInst = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const instrument =  data.get('instrument')
  const type = data.get('type')
  console.log('create an instrument ', instrument, type)
  createInstrument(instrument,type)

}

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* {user.name_first}'s Dashboard */}
              Dashboard
              
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
           
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                  
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
                {/* <Button onClick={delUser}>Delete this user</Button> */}
                {/* <Button onClick={addInst}>Add instrument</Button> */}
                {/* <Button onClick={addGenre}>Add Genre</Button> */}
                {/* <Box component="form" noValidate onSubmit={addInst} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <select  name="instrument"
                        required
                        fullWidth
                        id="instrument"> 
                      <option value="instrument_id"> -- Select an instrument -- </option>
                      {allInstruments.map((allInstruments) => <option value={allInstruments._links.instrument.href}>{allInstruments.name}</option>)}
                    </select>
                    </Grid>
                  </Grid>
                  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Instrument
                  </Button>
                </Box> */}
                {/* <Box component="form" noValidate onSubmit={createInst} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="instrument"
                        required
                        fullWidth
                        id="instrument"
                        label="Instrument"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="type"
                        required
                        fullWidth
                        id="type"
                        label="type"
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Create Instrument
                  </Button>
                </Box> */}
                </Grid>
                </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}