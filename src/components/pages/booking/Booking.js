import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Doctor from './Doctor';
import { eachHourOfInterval, isWithinInterval } from 'date-fns'
import { useEffect } from 'react';
import { DashboardCustomizeSharp } from '@mui/icons-material';
import Availability from './Availability';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100%px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );

const mdTheme = createTheme();

function BookingContent() {
  const [open, setOpen] = useState(true);
  const [userInfo, setInfo] = useState('');
  //const [doctors, setDoctors] = useState([]);

  const doctors = [ // perform a SQL query, grabbing the next 7 days for dates. Limit to 7
    {
      name: "Chen Tzen Kok",
      title: "D.D.S",
      occupation: "Dentist",
      rating: 4.9,
      location: "241 South Beverly Drive, 1/2, Beverly Hills, CA 90212",
      dates: [{
        date: "March 7",
        appointments: 0,
      },
      {
        date: "March 8",
        appointments: 1,
      },
      {
        date: "March 9",
        appointments: 2,
      },
      {
        date: "March 10",
        appointments: 3,
      },
      {
        date: "March 11",
        appointments: 4,
      },
      {
        date: "March 12",
        appointments: 5,
      },
      {
        date: "March 13",
        appointments: 17,
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
        date: "March 7",
        appointments: 0,
      },
      {
        date: "March 8",
        appointments: 1,
      },
      {
        date: "March 9",
        appointments: 2,
      },
      {
        date: "March 10",
        appointments: 3,
      },
      {
        date: "March 11",
        appointments: 4,
      },
      {
        date: "March 12",
        appointments: 5,
      },
      {
        date: "March 13",
        appointments: 17,
      },
    ],
    },
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(()=> {
    // make sure to call from postman instead
    // setDoctors(doctors => [...doctors, {
    //   name: "test",
    //   title: "D.D.S",
    //   rating: 4.9,
    //   location: "241 South Beverly Drive, 1/2, Beverly Hills, CA 90212"
    // }]);

    const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/appointment`, { 
    method: 'GET', 
    credentials: 'include',
    });

    var tempRes = await res.json();
    console.log(tempRes.data);
    setInfo(tempRes.data.username);
    convertData(tempRes.data);
  }

  function convertData(data) {
    let doctorAppt = [];
    let availableSlots = [];
    let startTime = new Date('2023-03-30T08:00:00');
    let endTime = new Date('2023-03-30T17:00:00');
    let timeSlots = eachHourOfInterval({ start: startTime, end: endTime });
    for(let i = 0; i < data.length; i++){
      doctorAppt.push([data[i].id, new Date(data[i].date+"T"+data[i].startTime), new Date(data[i].date+"T"+data[i].endTime)]);
    }
    for(let i = 0; i < timeSlots.length; i++){
      let slotAvailable = true;
      for (let j = 0; j < doctorAppt.length; j++) {
        if (isWithinInterval(timeSlots[i], { start: doctorAppt[j][1], end: doctorAppt[j][2] })) {
          slotAvailable = false;
          console.log("hi")
          break;
        }
      }
      if (slotAvailable) {
        availableSlots.push(timeSlots[i]);
      }
    }
    console.log("doctorAppt", doctorAppt);
    console.log("availableSlots", availableSlots);
    
  }


  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);

  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          {/* <CssBaseline /> */}
          <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Booking
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
          </AppBar>
        </Box>
        <Box style={{paddingTop: 100}}>
          { doctors.map((data, index) => (
              <Doctor data = {data}/>
          ))}
            {/* <p>hello</p> */}
          {/*
          Face
              use avatar
          Name
          Title
          Rating
          Distance
          Next Dates */}

          {/* onClick Open Popup to select times */}

          {/* onclick take to book appointment */}

        </Box>
    </ThemeProvider>
  );
}

export default function Booking() {
  return <BookingContent />;
}