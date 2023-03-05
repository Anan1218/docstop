import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Availability from './Availability';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './Booking.css';

function Doctor(props) {
  return (
    // <Typography component="h2" variant="h6" color="primary" gutterBottom>
    //   {props.name}
    // </Typography>
    <Grid className = "doctor-list" container space = {2}>
      <Grid item xs={2}>
        <Avatar sx={{width: 100, height: 100}} src={props.avatar}/>
      </Grid>
      <Grid item xs = {4}>
        <Typography variant="h5">
          { props.data.name + " " + props.data.title}
        </Typography>
        <Typography>
          { props.data.occupation}
        </Typography>
        <div style = {{display: 'flex'}}>
          <StarIcon/>
          <Typography>
            { props.data.rating}
          </Typography>
        </div>
        
        <div style = {{display: 'flex'}}>
          <LocationOnIcon/>
          <Typography>
            { props.data.location }
          </Typography>
        </div>
        
      </Grid>
      <Grid item xs = {6}>
        <Availability dates = {props.data.dates}/>
      </Grid>
    </Grid>
  );
}

Doctor.propTypes = {
  data: PropTypes.object
};

export default Doctor;