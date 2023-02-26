import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import SignOut from '../signout/SignOut';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href='/'>
        Dental Dash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const postData = {
      nameOrEmail: data.get('nameOrEmail'),
      password: data.get('password'),
    };

    console.log("hello" + postData.password)
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(postData)})
      // .then(dt => console.log(dt.json()))
      var tempRes = await res.json()

      if(res.status === 200) {
        toast.success("User logged in succesfully", {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
        })
        console.log("user logged in succesfully")
      } else {
        toast.error(tempRes.data.message, {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
        })    
      }

    
  };

  const handleClickTest = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, { 
    method: 'GET', 
    credentials: 'include',
    }).then(dt => console.log(dt.json()))
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nameOrEmail"
              label="Email Address / Username"
              name="nameOrEmail"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleClickTest}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Test to get user info
            </Button>
            <SignOut/>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}