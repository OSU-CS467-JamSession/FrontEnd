import * as React from 'react';
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
    if(lookup(event.target.value)) {
      setState(lookup(event.target.value).state);
      setCity(lookup(event.target.value).city);
    }
    else {
      setState("...");
      setCity("...");
    }
  };

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zipcode"
            autoComplete="zipcode"
            name="locationZipcode"
            id="locationZipcode"
            required
            value={zipcode}
            
            onChange={handleChangeState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            label="City"
            autoComplete="city"
            name="locationCity"
            id="locationCity"
            value={city}
            readOnly
            sx={{ input: { color: "text.disabled" } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            autoComplete="state"
            name="locationState"
            id="locationState"
            value={state}
            readOnly
            sx={{ input: { color: "text.disabled" } }}
          />
        </Grid>
    </Grid>
  );
}