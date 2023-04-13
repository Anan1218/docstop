import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Doctor from './Doctor';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import List from '@mui/material/List'
import { eachHourOfInterval, isWithinInterval, subMinutes } from 'date-fns'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';
import DropdownSearch from "./DropdownSearch";

import { useEffect } from 'react';

const mdTheme = createTheme();

const Booking = () => {
  const [open, setOpen] = useState(true);
  const [availAppts, setAvailAppts] = useState([]);
  //const [doctors, setDoctors] = useState([]);
  let startTime = new Date('2023-03-07T08:00:00');
  let endTime = new Date('2023-03-07T17:00:00');
  let timeSlots0 = eachHourOfInterval({ start: startTime, end: endTime });
  const doctors = [ // perform a SQL query, grabbing the next 7 days for dates. Limit to 7
    {
      name: "Chen Tzen Kok",
      title: "D.D.S",
      occupation: "Dentist",
      rating: 4.9,
      location: "241 South Beverly Drive, 1/2, Beverly Hills, CA 90212",
      dates: [{
        date: "March 6",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      {
        date: "March 7",
        availTimeSlots: timeSlots0,
        appointments: 0,
      },
      {
        date: "March 8",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      ],
    },
    {
      name: "Mengan Wang",
      title: "D.D.S",
      occupation: "Doctor",
      rating: 4.8,
      location: "405 Hilgard Avenue Box 951405 Los Angeles, CA 90095",
      dates: [{
        date: "March 6",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      {
        date: "March 7",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      {
        date: "March 8",
        availTimeSlots: timeSlots0,
        appointments: 0,
      },
      ],
    },
  ];

  for (let i = 0; i < 10; i++) {
    doctors.push({
      name: `Test Doc #${i + 1}`,
      title: "D.D.S",
      occupation: "Dentist",
      rating: 4.9,
      location: "10995 Le Conte Ave, Los Angeles, CA 90024",
      dates: [{
        date: "March 6",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      {
        date: "March 7",
        availTimeSlots: timeSlots0,
        appointments: 0,
      },
      {
        date: "March 8",
        availTimeSlots: availAppts,
        appointments: availAppts.length,
      },
      ],
    })
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // make sure to call from postman instead
    // setDoctors(doctors => [...doctors, {
    //   name: "test",
    //   title: "D.D.S",
    //   rating: 4.9,
    //   location: "241 South Beverly Drive, 1/2, Beverly Hills, CA 90212"
    // }]);

    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointment`, {
        method: 'GET',
        credentials: 'include',
      });

      var tempRes = await res.json();
      console.log(tempRes.data);
      setAvailAppts(convertData(tempRes.data));
    }

    //ALGORITHM TO DISPLAY AVAILABLE APPOINTMENT TIME
    // for loop through days:
    //   starttime = 9am
    //   endtime = 9pm
    //   arr = []
    //   for i in res.data:
    //     i.convertStringToTime()
    //     endTime = i.startTime
    //     arr.append({starttime, endtime})
    //     starttime = i.endTime

    //   if starttime != 9pm:
    //     arr.append({starttime, 9pm})

    //   return arr 


    // [[9-10, 12-3, 4-9], [9-10, 12-3, 4-9]]



    function convertData(data) {
      let doctorAppt = [];
      let availableSlots = [];
      let startTime = new Date('2023-03-30T08:00:00');
      let endTime = new Date('2023-03-30T17:00:00');
      let timeSlots = eachHourOfInterval({ start: startTime, end: endTime });
      for (let i = 0; i < data.length; i++) {
        doctorAppt.push([data[i].id, new Date(data[i].date + "T" + data[i].startTime), new Date(data[i].date + "T" + data[i].endTime)]);
      }
      for (let i = 0; i < timeSlots.length; i++) {
        let slotAvailable = true;
        for (let j = 0; j < doctorAppt.length; j++) {
          if (isWithinInterval(timeSlots[i], { start: doctorAppt[j][1], end: subMinutes(doctorAppt[j][2], 1) })) {
            slotAvailable = false;
            break;
          }
        }
        if (slotAvailable) {
          availableSlots.push(timeSlots[i]);
        }
      }
      console.log("doctorAppt", doctorAppt);
      console.log("availableSlots", availableSlots);
      return availableSlots;
    }


    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

  }, [])

  // todo: make responsive
  // todo: split into subcomponents

  return (
    <ThemeProvider theme={mdTheme}>
      <Box style={{ backgroundColor: "#FFFFFF", padding: "1em" }}>
        <Container style={{marginTop: "2.5em"}}>
          <Grid container style={{ marginBottom: "2em" }} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
            <DropdownSearch />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                placeholder="city, state, or zip code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item>
              <TextField
                type="datetime-local"
                variant="outlined"
                style={{ width: "14em" }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <h2 style={{ textAlign: "start", marginLeft: "1%" }}>All Dentists</h2>
            </Grid>
            <Grid item xs>
              <p style={{ marginTop: "2%" }}>Availability last updated 3:15pm PST 03/05/2023</p>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box style={{ backgroundColor: "#DCEBF7" }}>
        <Container>
          <Grid container>
            <Grid container item xs={6} style={{ minWidth: "36em" }}>
              {doctors.slice(0, doctors.length).map((renderData, i) =>
                i % 2 == 0 ? <Doctor data={renderData} key={crypto.randomUUID()} /> : <></>)}
            </Grid>
            <Grid container item xs={6} style={{ minWidth: "36em" }}>
              {doctors.slice(0, doctors.length).map((renderData, i) =>
                i % 2 == 1 ? <Doctor data={renderData} key={crypto.randomUUID()} /> : <></>)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Booking;