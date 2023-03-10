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