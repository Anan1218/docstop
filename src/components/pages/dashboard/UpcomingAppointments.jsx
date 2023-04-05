import { Avatar, Divider, ListItemAvatar, ListItemText, ListItemButton, ListItemSecondaryAction, Typography } from '@mui/material';
import React from 'react';
import Title from './Title';

const UpcomingAppointmentListView = ({appointmentInfo}) => {
    // TODO: Avatar icon
    return (
      <>
        <ListItemButton >
          <ListItemAvatar>
              <Avatar
                sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                }}
              >
                  C
              </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`You have a visit on ${appointmentInfo.date} at ${appointmentInfo.startTime}`}
            secondary={`with ${appointmentInfo.dentist.firstName} ${appointmentInfo.dentist.lastName}`}
          />
          <ListItemSecondaryAction>
              <Typography variant="caption" noWrap>
                 <button>Confirm Appointment</button>
                 <button>Cancel Appointment</button>
              </Typography>
          </ListItemSecondaryAction>
        </ListItemButton>
        <Divider />
      </>
    )
}

export default function UpcomingAppointments( {upcomingApt} ) {

  return (
    <React.Fragment>
      <Title>Upcoming Appointments</Title>
      {upcomingApt.data.map((appointment, idx) => 
      <div key={idx}>
        <UpcomingAppointmentListView  appointmentInfo={appointment} />
      </div>)
      }
      
    </React.Fragment>
  );
}