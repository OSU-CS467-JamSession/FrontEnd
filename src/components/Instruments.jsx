import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { getThisUserQ } from './services/getThisUser';
import { BrowserRouter as Router, Switch, 
  Route, redirect,  useNavigate} from "react-router-dom";
  import { useLocation} from "react-router-dom";

function preventDefault(event) {
    event.preventDefault();
  }

export default function Instruments() {
  
  return (
    <React.Fragment>
      <Title>My Instruments</Title>
      <Typography component="p" variant="h4">
        
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        
      </Typography>
      <div>
      </div>
    </React.Fragment>
  );
}