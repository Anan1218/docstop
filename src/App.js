import './App.css';
import SignIn from './components/accounts/signin/SignIn';
import SignUp from './components/accounts/signup/SignUp';
import {Route, Routes } from 'react-router-dom'
import NotFound from './components/pages/error/notFound';
import Home from './components/pages/landing/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/pages/dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route element={<SignIn />} exact path="/signin"/>
        <Route element={<SignUp />} exact path="/signup"/>
        <Route element={<ProtectedRoute />}>
          <Route element= {<Dashboard />} exact path='/user-dashboard' />
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/home" element={<Home />} /> {/* TODO: make this the main '/' path and make separate routes for sign in/up */}
      </Routes>
       <ToastContainer/>
      </div>
  );
}

export default App;
