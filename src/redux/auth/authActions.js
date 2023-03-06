// authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'


export const registerUser = createAsyncThunk(
  'auth/signup',
  async (postData, { rejectWithValue }) => {
    try {
      
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/patient`, { method: 'POST', headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify(postData)})

    var tempRes = await res.json()
    console.log(tempRes)

       if(res.status === 200|| res.status === 201) {
        console.log("user signed up succesfully")
      } else {
        return rejectWithValue(tempRes.data.message)
      }

    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        console.log(error.response)
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const userLogin = createAsyncThunk(
  'auth/signin',
  async (postData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(postData)})

    var tempRes = await res.json()
    console.log(tempRes)

       if(res.status === 200|| res.status === 201) {
        console.log("user signed up succesfully")
        return tempRes;
      } else {
        return rejectWithValue(tempRes.data.message)
      }

    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)