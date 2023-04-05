// ProtectedRoute.js
import { NavLink, Outlet } from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../global/AuthContext";

const ProtectedRoute = () => {
  const [ currentUser, _ ] = useContext(AuthContext);

  console.log("Protected route user", currentUser)

  // show unauthorized screen if no user is found in react context
  if (currentUser.loading) {
    return (
      <div className='unauthorized'>
        <h1>Checking user info</h1>
      </div>
    )
  }
  if (currentUser.data === null) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/signin'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute
