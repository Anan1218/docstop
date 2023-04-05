import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { ViewState} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  ViewSwitcher,
  DayView,
  WeekView,
  MonthView,
  Appointments, DateNavigator, TodayButton, AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import {useEffect, useState} from "react";

function dateStrInYMD(date) {
  const dateStr = date.getFullYear()  + "-" +
    (date.getMonth()+1).toString().padStart(2, "0") + "-" +
    date.getDate().toString().padStart(2, "0");
  // console.log(dateStr)
  return dateStr  // return yyyy-mm-dd
}

function dateStrInYMDT(date) {
  const dateStr = date.getFullYear()  + "-" +
    (date.getMonth()+1).toString().padStart(2, "0") + "-" +
    date.getDate().toString().padStart(2, "0") + "T" +
    date.getHours().toString().padStart(2, "0") + ":" +
    date.getMinutes().toString().padStart(2, "0");
  // console.log(dateStr)
  return dateStr  // return yyyy-mm-ddThh:mm
}

// TODO: Data loader, incremental fetch, past appointments
export default function Calender() {
  // Calender state
  const [age, setAge] = useState(0);
  const [curDate, setCurDate] = useState(dateStrInYMD(new Date()));

  // Remote data state
  // Each data is { startDate: '2023-04-01T09:45', endDate: '2023-04-01T11:00', title: 'Meeting' }
  // const [pastAppointments, setPastAppointments] = useState({data: [], hasNext: true})
  const [upAppointments, setUpAppointments] = useState({data: [], hasNext: true})

  const fetchUpcomingAppointment = async () => {
    // Don't fetch if we don't have future data
    if (!upAppointments.hasNext) return

    // Fetch with furthest date as our base
    const furthestDate =  upAppointments.data.length > 0 ?
      upAppointments.data[upAppointments.data.length - 1].slice(10) : dateStrInYMD(new Date())
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointment/upcoming?dateAfter=${furthestDate}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    ).then(r => r.json());
    console.log(res)

    // Remove duplicate appointments (same date)
    let skipCount = 0
    if (upAppointments.data.length > 0 && res.data.length > 0) {
      let dupDate = upAppointments.data[upAppointments.data.length - 1].slice(10)
      console.log("Checking duplicate date for: " + dupDate)
      for (let i = upAppointments.data.length - 1; i >= 0; i--) {
        if (upAppointments.data[i].startsWith(dupDate)) {
          skipCount++
        }
        else break
      }
    }

    // TODO: custom content tooltip, different color for appointment state
    // Result
    let newData = upAppointments.data.slice()
    for (let i = skipCount; i < res.data.length; i++) {
      newData.push({
        startDate: `${res.data[i].date}T${res.data[i].startTime.slice(0, 5)}`,
        endDate: `${res.data[i].date}T${res.data[i].endTime.slice(0, 5)}`,
        title: `${res.data[i].dentist.firstName} ${res.data[i].dentist.lastName}`,
      })
    }

    // update state
    setUpAppointments(app => ({...app, data: newData, hasNext: res.data.hasNext}))
  }

  useEffect(() => {
    fetchUpcomingAppointment()
  }, []);


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            mb: 3,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <FormControl sx={{ minWidth: 200 }} size='small'>
            <InputLabel id="demo-simple-select-standard-label">Dentist Schedule</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={age}
              onChange={handleChange}
              label="Dentist Schedule"
            >
              <MenuItem value={0}>My Schedule</MenuItem>
              <MenuItem value={10}>Ahmad Schedule</MenuItem>
              <MenuItem value={20}>Chen Schedule</MenuItem>
              <MenuItem value={30}>Winsterberg Schedule</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{display: 'flex', gap: '15px'}}>
            <Button variant="outlined">Create Personal Appointment</Button>
            <Button variant="contained">Create Appointment</Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Box/>

          {/* Time title and range slider */}
          <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <Typography variant="h4" component="h4">Appointments</Typography>
          </Box>

          <Box/>
        </Box>

      </div>

      {/* Scheduling Table */}
      <Paper>
        <Scheduler data={upAppointments.data} height={400}>
          <ViewState currentDate={curDate} onCurrentDateChange={(selectedDate) => {
            console.log(selectedDate);
            setCurDate(selectedDate);
          }}/>
          <MonthView />
          <WeekView startDayHour={9} endDayHour={19}/>
          <DayView startDayHour={9} endDayHour={14}/>
          <Appointments/>
          <AppointmentTooltip />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    </div>
  );
}
