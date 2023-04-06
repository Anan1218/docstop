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
import { eachHourOfInterval, isWithinInterval, subMinutes } from 'date-fns'


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
      location: "UCLA",
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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box style={{ paddingTop: 100 }}>
        {doctors.map((data) => (
          <Doctor data={data} key={crypto.randomUUID()} />
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default Booking;