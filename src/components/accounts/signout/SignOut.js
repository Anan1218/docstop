import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/auth/authSlice'

const SignOut = () => {
    
    const dispatch = useDispatch()

    const handleClickLogOut = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, { 
        method: 'GET', 
        credentials: 'include',
        })

        var tempRes = await res.json()
        if(res.status === 200) {
        toast.success("User logged out succesfully", {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
        })
        dispatch(logout())
        console.log("user logged out succesfully")
      } else {
        toast.error(tempRes.data.message, {
          autoClose: 2000, 
          position: toast.POSITION.TOP_CENTER
        })
        console.log(tempRes.data.message);
        
      }
    }; 

  return (
    <Button
              onClick={handleClickLogOut}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log Out
    </Button>
  )
}

export default SignOut