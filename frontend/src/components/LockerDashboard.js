import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for HTTP requests
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Pagination, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AdminSidebar from "./AdminSidebar";
import LockerTable from './LockerTable';
import './Dashboard.css';

import { useNavigate } from "react-router-dom";

// Simulate locker data for now
const generateData = () => {
  const sampleData = [];
  for (let i = 0; i < 20; i++) {  // Generating 20 lockers for testing
    sampleData.push({
      id: i,
      date: null,
      status: i % 2 === 0 ? 'Locked' : 'Opened',
      owner: `User ${i}`,
      location: `C${i % 2 + 1}`,
    });
  }
  return sampleData;
};

// Hook to manage locker data
const useLockerData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('lockerData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const initialData = generateData();
      setData(initialData);
      localStorage.setItem('lockerData', JSON.stringify(initialData));
    }
  }, []);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('lockerData', JSON.stringify(newData));
  };

  return [data, updateData];
};

const LockerDashboard = () => {
  const [data, setData] = useLockerData();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4); // Set the number of rows per page to 4
  const [buttonState, setButtonState] = useState({});  // To manage button states for each locker
  const navigate = useNavigate();

  // Handle user profile navigation
  const handleAvatarClick = () => {
    navigate("/profile");
  };

  // Handle page change for pagination
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setRowsPerPage(pageSize);
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle Lock/Unlock button click
  const handleButtonClick = async (id, action) => {
    const updatedData = [...data];
    const rowIndex = updatedData.findIndex((row) => row.id === id);
    const currentDate = format(new Date(), 'HH:mm | dd/MM/yy', { locale: vi });

    // Toggle the status based on action
    if (action === 'lock') {
      updatedData[rowIndex].status = 'Locked';
      updatedData[rowIndex].date = currentDate;
    } else if (action === 'unlock') {
      updatedData[rowIndex].status = 'Opened';
      updatedData[rowIndex].date = currentDate;
    }

    // Update button state
    setButtonState({
      ...buttonState,
      [id]: action,
    });

    setData(updatedData);  // Update the data state

    // Send HTTP request to backend to handle MQTT interaction (simulation)
    try {
      const response = await axios.post('http://localhost:1883/lock', {  // Ensure the correct port is used here
        action,
        id,  // Include locker id to target the correct topic
      });
      console.log(response.data);  // Log response from server
    } catch (err) {
      console.error('Error sending lock/unlock request to server:', err);
    }
  };

  return (
    <div className="dashboard-container flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <main className="main-content flex-grow ml-64">  {/* Main content adjusted for sidebar */} 
        <header className="header flex justify-between items-center bg-white p-4 shadow-md">
          <div className="header-left">
            <h1 className="text-2xl font-bold">Locker Management</h1>
            <p className="text-sm text-gray-500">Dashboard / Lockers</p>
          </div>
          <div className="header-right" onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
            <Avatar size={50} icon={<UserOutlined />} />
          </div>
        </header>

        <div className="table-section-container mt-6 px-4">
          <div className="table-section bg-white p-4 shadow-md rounded-md">
            {/* Pass the current page data to the LockerTable */}
            <LockerTable data={getCurrentPageData()} handleButtonClick={handleButtonClick} />
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <Pagination
              showSizeChanger
              onChange={handlePaginationChange}
              defaultCurrent={1}
              total={data.length}
              pageSize={rowsPerPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LockerDashboard;
