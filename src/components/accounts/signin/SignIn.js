import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../../redux/auth/authActions';
import LoadingButton from '@mui/lab/LoadingButton';

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

  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
    if(error){
        console.log(error);
        toast.error(error, {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
    })}
    if (userInfo) {
      toast.success("User signed in succesfully", {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
        });
        console.log(userInfo.data.roles);
      if (userInfo.data.roles[0] === "ROLE_USER" || userInfo.data.roles[0] === "ROLE_PATIENT"){
        navigate('/user-dashboard');
      }
      if (userInfo.data.roles[1] === "ROLE_ORG_ADMIN" || userInfo.data.roles[1] === "ROLE_ORG_DENTIST"){
        navigate('/admin-dashboard')
      }
    }
  }, [navigate, userInfo,error])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const postData = {
      nameOrEmail: data.get('nameOrEmail'),
      password: data.get('password'),
    };

    dispatch(userLogin(postData))

    
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
            <LoadingButton
              onClick={handleClickTest}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Test to get user info
            </LoadingButton>
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