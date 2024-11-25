import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Help from './Help/help';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} /> {/* Redirect to Login by default */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/help" element={<Help />} /> {/* Add Help route */}
            </Routes>
        </Router>
    );
}

export default App;