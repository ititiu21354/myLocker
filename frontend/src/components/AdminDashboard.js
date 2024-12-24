import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { getSessionData } from "../utils/sessionUtils";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [userName, setUserName] = useState("");
    const [usersData, setUsersData] = useState([]);
    const [roleFilter, setRoleFilter] = useState("admin"); // Mặc định là admin
    const navigate = useNavigate();

    useEffect(() => {
        const { token, role } = getSessionData();
        if (!token || role !== "admin") {
            navigate(role === "Pharmacist" ? "/dashboard" : "/");
            return;
        }
        fetchUsersData(token);
        fetchUserProfile(token);
    }, [navigate]);

    const fetchUsersData = async (token) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersData(response.data || []);
        } catch (error) {
            console.error("Failed to fetch users data:", error);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserName(response.data.name);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    const filteredUsers = roleFilter === "admin" 
        ? usersData.filter((user) => user.role === "admin") // Chỉ lọc admin
        : usersData;

    const handleAvatarClick = () => navigate("/profile");

    return (
        <div className="dashboard-container">
            <AdminSidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h1>Welcome Back, {userName}</h1>
                    </div>
                    <div className="header-right" onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
                        <Avatar size={50} icon={<UserOutlined />} />
                    </div>
                </header>

                {/* Total Users Section */}
                <section className="users-section">
                    <Card title={`Total Users: ${usersData.length}`} style={{ marginTop: 16 }}>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="roleFilter">Filter by Role: </label>
                            <select
                                id="roleFilter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="admin">Admin</option> {/* Chỉ hiển thị Admin */}
                            </select>
                        </div>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
