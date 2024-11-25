import React, { useState } from "react";
import {Form, Input, Select, Button, message, Dropdown} from 'antd';
import {
    HomeOutlined,
    BookOutlined,
    LockOutlined,
    ProjectOutlined,
    UserOutlined,
    QuestionCircleOutlined,
    DownOutlined
} from '@ant-design/icons';
import "./Dashboard.css";
import { Menu } from 'antd';

const LockerDashboard = () => {
    // Generate Sample Data
    const generateData = () => {
        const sampleData = [];
        for (let i = 1; i <= 50; i++) {
            sampleData.push({
                id: i,
                open: `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
                    Math.floor(Math.random() * 60)
                ).padStart(2, "0")} | ${String(Math.floor(Math.random() * 28 + 1)).padStart(
                    2,
                    "0"
                )}/02/24`,
                lock: i % 3 === 0 ? "---" : `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
                    Math.floor(Math.random() * 60)
                ).padStart(2, "0")} | ${String(Math.floor(Math.random() * 28 + 1)).padStart(2, "0")}/03/24`,
                status: i % 2 === 0 ? "Locked" : "Opened",
                owner: `User ${i}`,
                location: `C${i % 5 + 1}`,
            });
        }
        return sampleData;
    };

    const sampleData = generateData();

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(sampleData.length / rowsPerPage);

    // Get Current Page Data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return sampleData.slice(startIndex, endIndex);
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    // User info for the header
    const user = {
        name: "John Doe",
        avatar: "https://www.w3schools.com/w3images/avatar2.png", // Replace with actual user avatar URL
    };

    // Dropdown Menu for Profile and Sign Out
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="#">Profile</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#">Sign Out</a>
            </Menu.Item>
        </Menu>
    );

    // Side Menu State
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`w-1/5 bg-gray-100 p-4 fixed h-full transform ${isMenuVisible ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
            >
                <h5 className="font-bold text-lg mb-6 flex items-center">
                    <HomeOutlined className="mr-2" />
                    myLocker Dashboard
                </h5>
                <ul className="space-y-3">
                    <li className="font-medium text-gray-700 flex items-center">
                        <BookOutlined className="mr-2" />
                        <a href="#" className="hover:text-blue-600">Mainpage</a>
                    </li>
                    <li className="font-medium text-gray-700 flex items-center">
                        <LockOutlined className="mr-2" />
                        <a href="#" className="hover:text-blue-600">Locker</a>
                    </li>
                    <li className="font-medium text-gray-700 flex items-center">
                        <ProjectOutlined className="mr-2" />
                        <a href="#" className="hover:text-blue-600">Project</a>
                    </li>
                    <li className="font-medium text-gray-700 flex items-center">
                        <UserOutlined className="mr-2" />
                        <a href="#" className="hover:text-blue-600">User</a>
                    </li>
                    <li className="font-medium text-gray-700 flex items-center">
                        <QuestionCircleOutlined className="mr-2" />
                        <a href="/help" className="hover:text-blue-600">Help</a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div
                className={`flex flex-col transition-all duration-300 ${isMenuVisible ? "ml-20" : "ml-0"
                    } w-full`}
            >
                <div className="w-full flex flex-col ml-0"></div>
                {/* Header */}
                <header className="customHeader text-white px-6 py-4 shadow flex items-center">
                    <button
                        onClick={() => setIsMenuVisible(!isMenuVisible)}
                        className="text-white text-2xl mr-4 focus:outline-none"
                    >
                        &#9776; {/* Hamburger icon */}
                    </button>
                    <div className="flex justify-between w-full items-center">
                        <h1 className="text-xl font-bold">Locker Management</h1>
                        <div className="flex items-center space-x-3">
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-semibold">{user.name}</span>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <DownOutlined/>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Finding Section */}
                <div className="flex space-x-4 mb-6 findingSection">
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Status" name="status">
                            <Select placeholder="Select Status" className="w-full">
                                <Select.Option value="all">All</Select.Option>
                                <Select.Option value="lock">Lock</Select.Option>
                                <Select.Option value="unlock">Open</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Owner" name="owner">
                            <Input placeholder="Owner" className="w-full" />
                        </Form.Item>
                    </Form>
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Location" name="location">
                            <Input placeholder="Location" className="w-full" />
                        </Form.Item>
                    </Form>
                </div>

                {/* Table Section */}
                <div className="p-6 overflow-hidden">
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Date Open</th>
                                <th className="border border-gray-300 px-4 py-2">Date Lock</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Owner</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Setting</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {getCurrentPageData().map((row) => (
                                <tr
                                    key={row.id}
                                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.open}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.lock}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${row.status === "Locked"
                                                ? "bg-green-500"
                                                : "bg-blue-500"
                                                }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.owner}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.location}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-around">
                                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
                                            Lock
                                        </button>
                                        <button className="bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300">
                                            Unlock
                                        </button>
                                        <button className="bg-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-300">
                                            Release
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2 mb-10">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageSelect(page)}
                            className={`px-4 py-2 rounded ${currentPage === page
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <footer className="text-xs text-gray-500 text-center py-2">
                    ver 0.0.1
                </footer>
            </div>
        </div>
    );
};

export default LockerDashboard;