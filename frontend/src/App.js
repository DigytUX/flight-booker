import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Autocomplete, Box, Button, Container, Grid, Typography, TextField, OutlinedInput} from '@mui/material';

function App() {
  const [value, setValue] = React.useState(false);
  const [tripType, setTripType] = React.useState('round-trip');
  const [destination, setDestination] = React.useState(0)
  const [arrival, setArrival] = React.useState(0)
  const [guests, setGuests] = React.useState(0)


  const handleChange = (event, option) => {
    setTripType(option);
  };

  // airport api?
  const airports = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ]

  const searchParams = {
    type:tripType,
    destination:destination,
    arrival:arrival,
    guests:guests
  }

  const handleDestinationChange = (event, value) => {
    console.log('searchParams', searchParams)
    setDestination(value.label)
  }

  const handleArrivalChange = (event, value) => {
    setArrival(value.label)
  }

  const handleGuests = (event) => {
    setGuests(event.target.value)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'start',
        }}
      >
      <Box>
        <Typography variant="h2" component="h1">Flight Finder 2.0</Typography>
        <Typography variant="h5" component="p">Lets find some flights</Typography>
      </Box>
      <Box sx={{width:'100%'}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{my:2, width:'100%'}}>
              <Typography variant="body2" component="h1">Round Trip / One Way</Typography>
              <Box sx={{my:2, width:'100%'}}>
                <ToggleButtonGroup
                  color="primary"
                  value={tripType}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="round-trip">Round Trip</ToggleButton>
                  <ToggleButton value="one-way">One Way</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" component="h1">Destination:{destination}</Typography>
            <Autocomplete
              id="destination"
              onChange={handleDestinationChange}
              options={airports}
              sx={{ width: '100%' }}
              renderInput={(params) => 
              <TextField 
                {...params} 
                label="Destination Airport" 
              />}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" component="h1">Arrival:{arrival}</Typography>
            <Autocomplete
              onChange={handleArrivalChange}
              id="arrival"
              options={airports}
              sx={{ width: '100%' }}
              renderInput={(params) => 
              <TextField {...params} 
                label="Arrival airport" 
              />}
            />
          </Grid>
          <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              inputFormat="dd.mm.yyyy"
              renderInput={(props) => 
              <TextField 
                sx={{width:'100%'}}
                {...props} 
                inputProps={{
                  placeholder: "Departure Date"
                }}
              />
              }
              label="From"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputFormat="dd.mm.yyyy"
                renderInput={(props) => 
                <TextField 
                  sx={{width:'100%'}}
                  {...props} 
                  inputProps={{
                    placeholder: "Returning Date"
                  }}
                />
                }
                label="From"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <OutlinedInput 
            onChange={handleGuests}
              sx={{width:'100%'}} 
              value={guests}
              type='number' 
              inputProps={{
                placeholder: "Guests?"
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button sx={{width:'100%', py:2}} variant="contained" color="primary">Search</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  );
}

export default App;
