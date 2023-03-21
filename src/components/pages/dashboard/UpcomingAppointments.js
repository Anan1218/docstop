import { Typography } from '@mui/material';
import React from 'react';
import Title from './Title';


export default function UpcomingAppointments( {upcomingApt} ) {

  return (
    <React.Fragment>
      <Title>Upcoming Appointments</Title>
      {upcomingApt.data.map((appointment, idx) => 
      <div key={idx}>
      <Typography variant="body1" >
        {`You have a visit on ${appointment.date} at ${appointment.startTime}`}
      </Typography>
      <Typography variant="body2">
        {`with ${appointment.dentist.firstName} ${appointment.dentist.lastName}`}
      </Typography>
      </div>)
      }
      
    </React.Fragment>
  );
}