import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import './Booking.css';

function Availability(props) {
  return (
    <Box sx = {{flexGrow:1}}>
      <Grid container space = {2}>
        { props.dates.map((data, index) => (
          <Grid item xs = {12}>
            <Card
              variant = "outlined"
              style={data.appointments!==0 ? {backgroundColor: '#ebf8ff'}: {}} // white background if no appointments
              className = "availability-card">

              <Typography>
                {data.date}
              </Typography>
              <Typography>
                {data.appointments + " appointments left"}
              </Typography>
              <Typography>
                Available Time Slots: 
                {"\t\n"}
                {data.availTimeSlots?.map((slots) => {return <button>{slots.toLocaleTimeString?.()}</button>})}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}



Availability.propTypes = {
  dates: PropTypes.array,
};

export default Availability;