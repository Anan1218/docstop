import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText, IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import {AllDayPanel, ViewState} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  ViewSwitcher,
  DayView,
  WeekView,
  MonthView,
  Appointments, DateNavigator, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useState} from "react";

const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export default () => {
  const [age, setAge] = useState(0);
  const [curDate, setCurDate] = useState('2018-11-01');

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
            <Typography variant="h4" component="h4">Day xx</Typography>
          </Box>

          <Box/>
        </Box>

      </div>

      {/* Scheduling Table */}
      <Paper>
        <Scheduler data={schedulerData} height={400}>
          <ViewState currentDate={curDate} onCurrentDateChange={(selectedDate) => setCurDate(selectedDate)}/>
          <MonthView />
          <WeekView startDayHour={9} endDayHour={19}/>
          <DayView startDayHour={9} endDayHour={14}/>
          <Appointments/>
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    </div>
  );
}
