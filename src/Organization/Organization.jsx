import React, { useState } from "react";
import {
  HomeOutlined,
  BookOutlined,
  LockOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Organization.css";

const Organization = () => {
  const [activeRole, setActiveRole] = useState("Admin");
  const [isMenuVisible, setIsMenuVisible] = useState(true); // Trạng thái Sidebar

  const roles = ["Admin", "User", "Delivery Person"];
  const data = [
    { name: "Name 1", contact: "Phone/Email 1", status: "Active" },
    { name: "Name 2", contact: "Phone/Email 2", status: "Inactive" },
    { name: "Name 3", contact: "Phone/Email 3", status: "Pending" },
    { name: "Name 4", contact: "Phone/Email 4", status: "Active" },
    { name: "Name 5", contact: "Phone/Email 5", status: "Inactive" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 p-4 fixed h-full transform ${
          isMenuVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64`}
      >
        <h5 className="font-bold text-lg mb-6 flex items-center">
          <HomeOutlined className="mr-2" />
          myLocker Dashboard
        </h5>
        <ul className="space-y-3">
          <li className="font-medium text-gray-700 flex items-center">
            <BookOutlined className="mr-2" />
            <a href="/" className="hover:text-blue-600">
              Mainpage
            </a>
          </li>
          <li className="font-medium text-gray-700 flex items-center">
            <LockOutlined className="mr-2" />
            <a href="/organization" className="hover:text-blue-600">
              Organization
            </a>
          </li>
          <li className="font-medium text-gray-700 flex items-center">
            <LockOutlined className="mr-2" />
            <a href="#" className="hover:text-blue-600">
              Locker
            </a>
          </li>
          <li className="font-medium text-gray-700 flex items-center">
            <ProjectOutlined className="mr-2" />
            <a href="#" className="hover:text-blue-600">
              Project
            </a>
          </li>
          <li className="font-medium text-gray-700 flex items-center">
            <UserOutlined className="mr-2" />
            <a href="#" className="hover:text-blue-600">
              User
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isMenuVisible ? "ml-64 w-[calc(100%-16rem)]" : "ml-0 w-full"
        } p-6`}
      >
        {/* Header */}
        <header className="organization-header flex items-center justify-between">
            <div className="flex items-center">
        <button
             onClick={() => setIsMenuVisible(!isMenuVisible)} // Toggle Sidebar
             className="hamburger-icon text-white text-2xl focus:outline-none mr-4"
            >
             &#9776; {/* 3 dấu gạch ngang */}
        </button>

       <h1 className="text-white font-bold text-lg">Organization</h1>
      </div>
       <div className="welcome-text">
       <span className="welcome-prefix">Welcome,</span>
       <span className="welcome-admin">Admin!</span>
      </div>
        </header>

        {/* Roles & Permissions */}
        <div className="roles-container mt-6">
          {roles.map((role) => (
            <button
              key={role}
              className={`role-button ${activeRole === role ? "active" : ""}`}
              onClick={() => setActiveRole(role)}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="table-container mt-6">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone/Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{row.name}</td>
                  <td>{row.contact}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons mt-6">
          <button className="action-button add">+ Add</button>
          <button className="action-button delete">🗑 Delete</button>
          <button className="action-button edit">✎ Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Organization;
