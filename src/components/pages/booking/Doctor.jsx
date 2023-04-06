import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import Availability from './Availability';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import './Booking.css';

import { Card } from "@mui/material"
import './Booking.css';

let mdTheme = createTheme();
mdTheme = responsiveFontSizes(mdTheme);

const Doctor = (props) => {
  return <ThemeProvider theme={mdTheme}>
    <Card style={{ maxWidth: "35em", margin: "5%", padding: "1em" }}>
      <Grid container>
        <Grid xs={2}>
          <Avatar style={{marginTop: "1em"}} src={props.avatar} sx={{ width: 80, height: 80 }} />
        </Grid>
        <Grid xs={7}>
          <Stack spacing={1.1}>
            <Grid container>
              <Grid item xs={10}>
                <h3>{props.data.name}</h3>
              </Grid>
              <Grid item>
                <p style={{ color: "#555555" }}>4.5 mi</p>
              </Grid>
            </Grid>
            <p style={{ color: "#555555" }}>{props.data.location}</p>
            <Grid container>
              <Grid item xs={1.25}>
                <StarIcon style={{ color: "#0038FF" }} />
              </Grid>
              <Grid item xs={1.5}>
                <h4>{props.data.rating}</h4>
              </Grid>
              <p style={{ color: "#555555" }}>83 verified reviews</p>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2} style={{ alignItems: "center", paddingTop: "1em" }}>
            <Button variant="contained" style={{ textTransform: "unset", padding: "0.3em 2.5em 0.3em 2.5em" }}>Book</Button>
            <Button variant="outlined" style={{ textTransform: "unset" }}>View Reviews</Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  </ThemeProvider >
}

export default Doctor;