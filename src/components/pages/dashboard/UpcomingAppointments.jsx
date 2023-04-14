import { Avatar, Divider, ListItemAvatar, ListItemText, ListItemButton, ListItemSecondaryAction, Typography, ListItem, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Title from './Title';

const UpcomingAppointmentListView = ({appointmentInfo, setLoadingDelete, loadingDelete}) => {

  const cancelAppoint = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',}
    ).then(r => r.json());

    setLoadingDelete(!loadingDelete);
  }
    // TODO: Avatar icon
    return (
      <>
      {console.log("appoint info: " , appointmentInfo)}
        <ListItem >
          <ListItemAvatar>
              <Avatar
                sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                }}
              >
                  Test
              </Avatar>
          </ListItemAvatar>
          <div>
          <ListItemText 
            primary={`You have a visit on ${appointmentInfo.date} at ${appointmentInfo.startTime}`}
            secondary={`with ${appointmentInfo.dentist.firstName} ${appointmentInfo.dentist.lastName}`}
          />
          <ListItemSecondaryAction>
              <Typography variant="caption" noWrap>
                 <Button sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={() => cancelAppoint(appointmentInfo.id)}>Cancel Appointment</Button>
              </Typography>
          </ListItemSecondaryAction>
          </div>
        </ListItem>
        <Divider />
      </>
    )
}

export default function UpcomingAppointments( {upcomingApt, setLoadingDelete, loadingDelete} ) {

  return (
    <React.Fragment>
      <Title>Upcoming Appointments</Title>
      {upcomingApt.data.map((appointment, idx) => 
        <UpcomingAppointmentListView  key={idx} appointmentInfo={appointment} setLoadingDelete={setLoadingDelete} loadingDelete={loadingDelete} />)
      }
      
    </React.Fragment>
  );
}