import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import Navigation from './navigation/navigation';
import Patient from './patient/patient';
import React from 'react';
import Dash from './patient/dash';
import AuthForm from './AuthForm/AuthForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="doctordashboard/:id" element={<DoctorDashboard/>} />
        <Route path="navigation" element={<Navigation/>} />
        <Route path="patient/:email" element={<Patient/>} />
        <Route path="dash/:email" element={<Dash/>} />
        <Route index element ={<AuthForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
