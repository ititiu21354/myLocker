import React from 'react';
import {
    HomeOutlined,
    MedicineBoxOutlined,
    AppstoreOutlined,
    TeamOutlined,
    FileTextOutlined,
    UserOutlined,
    LoginOutlined,
    LockOutlined,
    TruckOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        });
        navigate('/');
    };

    return (
        <aside className="w-64 bg-black text-[#4D4D4D] h-screen flex flex-col p-4 shadow-md">
            <div className="flex flex-col items-center mb-10">
                {/* <img src={logo} alt="MediMaster" className="w-20 h-20 mb-4" /> */}
                <h2 className="text-3xl text-[#f15a22] font-semibold">myLOCKER</h2>
            </div>
            <nav className="flex-grow">
                <ul>
                    <li>
                        <a href="/Lockers" className="flex items-center p-2 hover:bg-gray-100 rounded-md text-xl">
                            <LockOutlined className="mr-3" /> Lockers
                        </a>
                    </li>
                    <li>
                        <a href="/receiver-manage" className="flex items-center p-2 hover:bg-gray-100 rounded-md text-xl">
                            <UserOutlined className="mr-3" /> Receivers
                        </a>
                    </li>
                    <li>
                        <a href='/customers-manage' className="flex items-center p-2 hover:bg-gray-100 rounded-md text-xl">
                            <TeamOutlined className="mr-3" /> Senders
                        </a>
                    </li>
                    <li>
                        <a onClick={handleLogout} className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md text-xl">
                            <LoginOutlined className="mr-3" /> Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
