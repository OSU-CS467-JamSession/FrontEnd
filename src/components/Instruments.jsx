import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

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