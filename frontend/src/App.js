import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Profile from './components/Profile';
import ReceiverManage from "./components/ReceiverManage.js";
import CustomerManage from "./components/CustomerManage";
import ForgotPassword from "./components/ForgotPassword";
import './index.css';
import LockerDashboard from './components/LockerDashboard.js';


function App() {
    const ProtectedRoute = ({ children, roles }) => {
        const storedRole =
            sessionStorage.getItem("userRole") || localStorage.getItem("userRole");

        if (!storedRole) {
            return <Navigate to="/" replace />;
        }

        if (roles.includes(storedRole)) {
            return children;
        }

        if (storedRole === "admin") {
            return <Navigate to="/admin-dashboard" replace />;
        }
        

        return <Navigate to="/" replace />;
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />

                <Route path='/Lockers' element={
                    <ProtectedRoute roles={[ 'admin']}>
                        <LockerDashboard />
                    </ProtectedRoute>
                } />
                <Route path='/profile' element={
                    <ProtectedRoute roles={['admin']}>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path='/receiver-manage' element={
                    <ProtectedRoute roles={['admin']}>
                        <ReceiverManage />
                    </ProtectedRoute>
                } />
                <Route path='/customers-manage' element={
                    <ProtectedRoute roles={['admin']}>
                        <CustomerManage />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
