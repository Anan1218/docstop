import './App.css';
import SignIn from './components/accounts/signin/SignIn';
import SignUp from './components/accounts/signup/SignUp';
import {Route, Routes } from 'react-router-dom'
import NotFound from './components/pages/error/notFound';
import Home from './components/pages/landing/index'

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route element={<SignIn />} exact path="/signin"/>
        <Route element={<SignUp />} exact path="/signup"/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/home" element={<Home />} /> {/* TODO: make this the main '/' path and make separate routes for sign in/up */}
      </Routes>
  );
}

export default App;
