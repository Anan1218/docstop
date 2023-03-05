import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Availability from './Availability';
import './Booking.css';

function Doctor(props) {
  return (
    // <Typography component="h2" variant="h6" color="primary" gutterBottom>
    //   {props.name}
    // </Typography>
    <Grid className = "doctor-list" container space = {2}>
      <Grid item xs={2}>
        <Avatar src={props.avatar}/>
      </Grid>
      <Grid item xs = {4}>
        <Typography>
          { props.data.name + " " + props.data.title}
        </Typography>
        <Typography>
          { props.data.rating}
        </Typography>
        <Typography>
          { props.data.location }
        </Typography>
      </Grid>
      <Grid item xs = {6}>
        <Availability dates = {props.data.dates}/>
      </Grid>
    </Grid>
  );
}

Doctor.propTypes = {
  data: PropTypes.object
  // name: PropTypes.string,
  // title: PropTypes.string,
  // rating: PropTypes.number,
  // location: PropTypes.string
};

export default Doctor;