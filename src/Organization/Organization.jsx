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
  const [isMenuVisible, setIsMenuVisible] = useState(true); 
  const [selectedRows, setSelectedRows] = useState([]); 
  const [editingRow, setEditingRow] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", status: "" }); 


  const initialData = {
    Admin: [
      { id: 1, name: "Admin 1", contact: "admin1@example.com", status: "Active" },
      { id: 2, name: "Admin 2", contact: "admin2@example.com", status: "Inactive" },
    ],
    User: [
      { id: 1, name: "User 1", contact: "user1@example.com", status: "Pending" },
      { id: 2, name: "User 2", contact: "user2@example.com", status: "Active" },
    ],
    "Delivery Person": [
      { id: 1, name: "Delivery 1", contact: "delivery1@example.com", status: "Active" },
      { id: 2, name: "Delivery 2", contact: "delivery2@example.com", status: "Inactive" },
    ],
  };

  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newRow = {
      id: data[activeRole].length + 1,
      name: `${activeRole} ${data[activeRole].length + 1}`,
      contact: `${activeRole.toLowerCase()}${data[activeRole].length + 1}@example.com`,
      status: "Active",
    };
    setData({ ...data, [activeRole]: [...data[activeRole], newRow] });
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = () => {
    setData({
      ...data,
      [activeRole]: data[activeRole].filter((row) => !selectedRows.includes(row.id)),
    });
    setSelectedRows([]);
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditForm({ name: row.name, contact: row.contact, status: row.status });
  };

  const handleSave = () => {
    setData({
      ...data,
      [activeRole]: data[activeRole].map((row) =>
        row.id === editingRow ? { ...row, ...editForm } : row
      ),
    });
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  return (
    <div className="organization-container flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white-100 p-4 fixed h-full transform ${
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
            <h1 className="text-white font-bold text-lg">Organization</h1>
          </div>
          <div className="welcome-text">
            <span className="welcome-prefix">Welcome,</span>
            <span className="welcome-admin">Admin!</span>
          </div>
        </header>

        {/* Roles & Permissions */}
        <div className="roles-container mt-6">
          {Object.keys(data).map((role) => (
            <button
              key={role}
              className={`role-button ${activeRole === role ? "active" : ""}`}
              onClick={() => {
                setActiveRole(role);
                setSelectedRows([]);
              }}
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
                <th>Select</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data[activeRole].map((row) => (
                <tr key={row.id}>
                  <td>
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td>
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={editForm.contact}
                        onChange={(e) =>
                          setEditForm({ ...editForm, contact: e.target.value })
                        }
                      />
                    ) : (
                      row.contact
                    )}
                  </td>
                  <td>
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                      />
                    ) : (
                      row.status
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td>
                    {editingRow === row.id ? (
                      <>
                        <button onClick={handleSave} className="save-button">
                          Save
                        </button>
                        <button onClick={handleCancel} className="cancel-button">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(row)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons mt-6">
          <button className="action-button add" onClick={handleAdd}> + Add</button>
          <button className="action-button delete" onClick={handleDelete}> 🗑 Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Organization;
