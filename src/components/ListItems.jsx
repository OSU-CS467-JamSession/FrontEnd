import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QueueIcon from '@mui/icons-material/Queue';
import Divider from '@mui/material/Divider'
import { People, Speaker } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ListItems() {

  const navigate = useNavigate();
  const location = useLocation();

  const userID = location.state;
  console.log("UserID: ", userID)

  return (
  <React.Fragment>
    <ListItemButton onClick= { () => navigate('/Profile', {state: userID})}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <Divider
      sx={{ color: "text.secondary" }}
      variant="middle"
      flexItem
    >
      Search
    </Divider>
    <ListItemButton>
      <ListItemIcon>
        <QueueIcon />
      </ListItemIcon>
      <ListItemText primary="Posts" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Speaker />
      </ListItemIcon>
      <ListItemText primary="Sessions" />
    </ListItemButton>
    <ListItemButton onClick= { () => navigate('/Users', {state: userID})}>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
  )
}