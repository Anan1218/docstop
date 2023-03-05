import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Availability(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.name}
    </Typography>
  );
}

Availability.propTypes = {
  dates: PropTypes.array,
};

export default Availability;