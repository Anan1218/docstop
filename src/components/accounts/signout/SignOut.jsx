import {Button} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';
import {toast} from 'react-toastify';

const SignOut = () => {

   const navigate = useNavigate();
  const handleClickLogOut = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    }).then(r => r.json());

    if (res.success) {
      toast.success("User logged out succesfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      })
      navigate('/')
      console.log("user logged out succesfully")
    } else {
      toast.error(res.data.message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      })
      console.log(res.data.message);
    }
  };

  return (
    <Button
      onClick={handleClickLogOut}
      fullWidth
      variant="contained"
      sx={{mt: 3, mb: 2}}
    >
      Log Out
    </Button>
  )
}

export default SignOut
