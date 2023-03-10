import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectExperience() {
  const [exp, setExp] = React.useState('');

  const handleChange = (event) => {
    setExp(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="experience-label" required>Experience</InputLabel>
        <Select
          id="experience"
          value={exp}
          label="Experience"
          required
          onChange={handleChange}
        >
          <MenuItem value={1}>Novice</MenuItem>
          <MenuItem value={2}>Advanced Beginner</MenuItem>
          <MenuItem value={3}>Competent</MenuItem>
          <MenuItem value={4}>Proficient</MenuItem>
          <MenuItem value={5}>Expert</MenuItem>
        </Select>
      </FormControl>
  );
}