import logo from './logo.svg';
import './App.css';
import SignIn from './components/accounts/signin/SignIn';
import SignUp from './components/accounts/signup/SignUp';
import {Router, Route, Routes } from 'react-router-dom'
import NotFound from './components/pages/error/notFound';

function App() {
  return (
    <div>
      <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route element={<SignIn />} exact path="/signin"/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
