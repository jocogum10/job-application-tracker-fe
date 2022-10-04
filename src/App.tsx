import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workspace from './pages/Workspace';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/dashboard" element={ <Dashboard /> }/>
      <Route path="/login" element={ <LogIn /> }/>
      <Route path="/signup" element={ <SignUp /> }/>
      <Route path="/profile" element={ <Profile /> }/>
      <Route path="/workspace" element={ <Workspace /> }/>
    </Routes>
  );
}

export default App;
