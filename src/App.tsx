import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workspace from './pages/Workspace';
import Header from './components/Header';

function App() {
  return (
    <main className='h-screen overflow-auto bg-gray-200'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </main>

  );
}

export default App;
