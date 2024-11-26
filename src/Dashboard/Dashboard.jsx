import React, { useState } from "react";
import { Form, Input, Select, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons"; // Icon for the dropdown
import "./Dashboard.css";

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

    //const sampleData = generateData();
    const sampleData = [
        { id: 1, status: "Opened", lastOpen: null, lastLock: null, user: null, location: "Location A", history: [] },
        { id: 2, status: "Opened", lastOpen: null, lastLock: null, user: null, location: "Location B", history: [] },
        // Add more rows as needed
    ];
    

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
            <Menu.Item key="profile">
                <a href="#">Profile</a>
            </Menu.Item>
            <Menu.Item key="signout">
                <a href="#">Sign Out</a>
            </Menu.Item>
        </Menu>
    );

    //Create the modal for history
    const [selectedLocker, setSelectedLocker] = useState(null);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    // Function to open the modal
    const handleHistoryClick = (locker) => {
        setSelectedLocker(locker);
        setIsHistoryModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedLocker(null);
        setIsHistoryModalOpen(false);
    };


    // State for button and status interaction
    const [buttonState, setButtonState] = useState({});
    const [data, setData] = useState(sampleData);

    const handleButtonClick = (id, action) => {
        const updatedData = [...data]; // Clone the data state
        const rowIndex = updatedData.findIndex((row) => row.id === id);
        const locker = updatedData[rowIndex];
        const timestamp = new Date().toLocaleString();
    
        if (rowIndex === -1) {
            console.error(`Row with ID ${id} not found.`);
            return;
        }
    
        // Get the current timestamp
        const currentTime = new Date().toLocaleString();
    
        // Simulate the current user
        const currentUser = "Current User"; // Replace with actual user info if available
    
        // Update the status, timestamps, and user based on the action
        switch (action) {
            case "lock":
                updatedData[rowIndex].status = "Locked";
                updatedData[rowIndex].lastLock = currentTime;
                updatedData[rowIndex].user = currentUser;
                break;
            case "unlock":
                updatedData[rowIndex].status = "Opened";
                updatedData[rowIndex].lastOpen = currentTime;
                updatedData[rowIndex].user = currentUser;
                break;
            case "release":
                updatedData[rowIndex].status = "Released";
                updatedData[rowIndex].user = ""; // Clear user on release
                break;
            default:
                console.error(`Invalid action: ${action}`);
                return;
        }
    
        // Update button state and data
        setButtonState((prevState) => ({
            ...prevState,
            [id]: action,
        }));

        // Add the action to the history
        locker.history.push({ action, timestamp });

        //Update state
        setData(updatedData);
    };    
    

    //action button
    const ActionButton = ({ id, action, currentState, onClick, color, label }) => (
        <button
            onClick={() => onClick(id, action)}
            aria-label={label}
            className={`${
                currentState === action ? `font-bold text-${color}-600` : "text-gray-600"
            } bg-${color}-200 px-2 py-1 rounded hover:bg-${color}-300 hover:text-white`}
        >
            {label}
        </button>
    );  
    
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <div className="flex h-screen bg-gray">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white-100 p-4 min-h-screen">
                <h5 className="font-bold text-lg mb-6">myVNG Dashboard</h5>
                <ul className="space-y-3">
                    <li className="font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-600">
                            Work
                        </a>
                    </li>
                    <li className="font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-600">
                            Form Portal
                        </a>
                        <ul className="pl-4 space-y-2 text-gray-500">
                            <li>
                                <a href="#" className="hover:text-blue-600">Forms</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Group</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Provider</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Quick Action</a>
                            </li>
                        </ul>
                    </li>
                    {/* Other menu items */}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="w-4/5 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white-600 text-black px-6 py-4">
                    <div className="flex justify-between items-center">
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
                                    <DownOutlined />
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
                <div className="table-section bg-gray p-4 shadow rounded-md">
                <table className="w-full text-center border-collapse border border-gray-300">
    <thead>
        <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">ID</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Last Open</th>
            <th className="px-4 py-2 border border-gray-300">Last Lock</th>
            <th className="px-4 py-2 border border-gray-300">User</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
            <th className="px-4 py-2 border border-gray-300">History</th>
        </tr>
    </thead>
    <tbody>
        {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{row.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                    <span
                        className={`px-2 py-1 rounded text-white ${
                            row.status === "Locked"
                                ? "bg-red-500"
                                : row.status === "Opened"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                    >
                        {row.status}
                    </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">{row.lastOpen || "Never Opened"}</td>
                <td className="px-4 py-2 border border-gray-300">{row.lastLock || "Never Locked"}</td>
                <td className="px-4 py-2 border border-gray-300">{row.user || "No User"}</td>
                <td className="border border-gray-300 px-4 py-2">{row.location}</td>
                <td className="px-4 py-2 border border-gray-300">
                    <button
                        onClick={() => handleButtonClick(row.id, "lock")}
                        className={`${
                            buttonState[row.id] === "lock" ? "font-bold text-red-600" : "text-gray-600"
                        } bg-red-200 px-2 py-1 rounded hover:bg-red-300`}
                    >
                        Lock
                    </button>
                    <button
                        onClick={() => handleButtonClick(row.id, "unlock")}
                        className={`${
                            buttonState[row.id] === "unlock" ? "font-bold text-cyan-600" : "text-gray-600"
                        } bg-green-200 px-2 py-1 rounded hover:bg-green-300`}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => handleButtonClick(row.id, "release")}
                        className={`${
                            buttonState[row.id] === "release" ? "font-bold text-blue-600" : "text-gray-600"
                        } bg-gray-200 px-2 py-1 rounded hover:bg-gray-300`}
                    >
                    </button>
                    <button
                        onClick={() => handleButtonClick(row.id, "release")}
                        className={`${
                            buttonState[row.id] === "release" ? "font-bold text-blue-600" : "text-gray-600"
                        } bg-gray-200 px-2 py-1 rounded hover:bg-gray-300`}
                    >
                        Release
                    </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                    <button
                        onClick={() => handleHistoryClick(row)}
                        className="text-blue-500 hover:underline"
                    >
                        History
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
    {isHistoryModalOpen && selectedLocker && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4">
                    Locker History (ID: {selectedLocker.id})
                </h2>
                {selectedLocker.history && selectedLocker.history.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {selectedLocker.history.map((entry, index) => (
                            <li key={index}>
                                <span className="font-semibold">{entry.action}</span> at {entry.timestamp}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No history available.</p>
                )}
            </div>
        </div>
    )}
</div>

                <div className="table-section bg-gray p-4 shadow rounded-md">
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
                </div>
            </div>
        </div>
    );
};
export default LockerDashboard;
