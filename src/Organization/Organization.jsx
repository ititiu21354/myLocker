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
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Trạng thái Sidebar
  const [selectedRows, setSelectedRows] = useState([]); // Lưu trữ các dòng được chọn
  const [editingRow, setEditingRow] = useState(null); // Lưu trữ dòng đang được chỉnh sửa
  const [editForm, setEditForm] = useState({ name: "", contact: "", status: "" }); // Lưu thông tin chỉnh sửa
  const roles = ["Admin", "User", "Delivery Person"];
  const [data, setData] = useState([
    { id: 1, name: "Name 1", contact: "Phone/Email 1", status: "Active" },
    { id: 2, name: "Name 2", contact: "Phone/Email 2", status: "Inactive" },
    { id: 3, name: "Name 3", contact: "Phone/Email 3", status: "Pending" },
    { id: 4, name: "Name 4", contact: "Phone/Email 4", status: "Active" },
    { id: 5, name: "Name 5", contact: "Phone/Email 5", status: "Inactive" },
  ]);

  // Hàm thêm dòng mới
  const handleAdd = () => {
    const newRow = {
      id: data.length + 1,
      name: `Name ${data.length + 1}`,
      contact: `Phone/Email ${data.length + 1}`,
      status: "Active",
    };
    setData([...data, newRow]);
  };

  // Hàm xử lý khi chọn checkbox
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Hàm xóa dòng được chọn
  const handleDelete = () => {
    setData(data.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };
  // Hàm bắt đầu chỉnh sửa
  const handleEdit = (row) => {
    setEditingRow(row.id); // Lưu lại id của dòng đang chỉnh sửa
    setEditForm({ name: row.name, contact: row.contact, status: row.status }); // Điền thông tin của dòng vào form
  };
  
  // Hàm lưu chỉnh sửa
  const handleSave = () => {
    setData(
      data.map((row) =>
        row.id === editingRow ? { ...row, ...editForm } : row // Cập nhật thông tin dòng
      )
    );
    setEditingRow(null); // Đặt lại trạng thái chỉnh sửa
  };
  
  // Hàm hủy chỉnh sửa
  const handleCancel = () => {
    setEditingRow(null); // Đặt lại trạng thái chỉnh sửa
  };
  
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
                <th>Select</th> {/* Thêm cột checkbox */}
                <th>Edit</th> {/* Thêm cột Edit */}
              </tr>
            </thead>
            <tbody>
  {data.map((row) => (
    <tr key={row.id} className={row.id % 2 === 0 ? "even-row" : "odd-row"}>
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
          <button onClick={() => handleEdit(row)} className="edit-button">
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
