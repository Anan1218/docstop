import './App.css';
import SignIn from './components/accounts/signin/SignIn';
import SignUp from './components/accounts/signup/SignUp';
import {Route, Routes } from 'react-router-dom'
import NotFound from './components/pages/error/notFound';
import Home from './components/pages/landing/index'
import Schedule from "./components/pages/schedule";
import Booking from './components/pages/booking/Booking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/pages/dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboard from './components/pages/adminDashboard/Dashboard';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route element={<SignIn />} exact path="/signin"/>
        <Route element={<SignUp />} exact path="/signup"/>
        <Route element={<Schedule />} exact path="/schedule"/>
        <Route element={<ProtectedRoute />}>
          <Route element= {<Dashboard />} exact path='/user-dashboard' />
          <Route element= {<AdminDashboard />} exact path='/admin-dashboard' />
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/home" element={<Home />} /> {/* TODO: make this the main '/' path and make separate routes for sign in/up */}
        <Route path="/booking" element={<Booking /> }/>
      </Routes>
       <ToastContainer/>
      </div>
  );
}

export default App;
