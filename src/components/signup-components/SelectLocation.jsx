import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { lookup } from 'zipcodes';

export default function SelectLocation() {
  const initZipcode = 90210;
  const [zipcode, setZipcode] = React.useState(initZipcode);
  const [state, setState] = React.useState(lookup(initZipcode).state);
  const [city, setCity] = React.useState(lookup(initZipcode).city);

  const handleChangeState = (event) => {
    setZipcode(event.target.value);
    setState(lookup(zipcode).state);
    setState(lookup(zipcode).city);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  console.log(lookup(zipcode));

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zipcode"
            autoComplete="zipcode"
            name="locationZipcode"
            required
            fullWidth
            value={zipcode}
            id="locationZipcode"
            
            onChange={handleChangeState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            value={city}
            disabled
            readOnly={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            value={state}
            disabled
            readOnly={true}
          />
        </Grid>
    </Grid>
  );
}