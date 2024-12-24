import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { ReactComponent as Office365Icon } from '../Assets/office365-icon.svg';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import './Login.css';
import axios from 'axios';
import Footer from './Footer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { instance } = useMsal();

    // Handle Login with Username and Password
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
                username,
                password
            });

            const { token } = response.data;

            // Save the token based on the "remember me" option
            if (remember) {
                localStorage.setItem('token', token);
                console.log('Token saved in localStorage');
            } else {
                sessionStorage.setItem('token', token);
                console.log('Token saved in sessionStorage');
            }

            // Fetch user profile to check role
            const profileResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const role = profileResponse.data.role;

            // Save role based on the "remember me" option
            if (remember) {
                localStorage.setItem('userRole', role);
                console.log('Role saved in localStorage');
            } else {
                sessionStorage.setItem('userRole', role);
                console.log('Role saved in sessionStorage');
            }

            // Navigate based on role
             if (role === 'admin') {
                navigate('/Lockers');
            } else {
                message.error("Unauthorized role");
            }

        } catch (error) {
            message.error("Invalid username or password");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Office 365 Login
    const handleOffice365Login = () => {
        setLoading(true);
        instance.loginPopup({
            scopes: ["user.read"],
            prompt: "select_account"
        })
            .then(() => {
                message.success('Login with Office 365 successful');
                navigate('/admin-dashboard');
            })
            .catch(err => {
                console.error('Office 365 Login Error:', err);
                if (err.errorCode) {
                    message.error(`Error Code: ${err.errorCode}`);
                }
                if (err.errorMessage) {
                    message.error(`Error Message: ${err.errorMessage}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow flex justify-start items-center px-12 bg-gray-100 bg-cover"  style={{ backgroundImage: "url('/login.png')" }}>
                <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: '400px', height: 'auto' }}>
                    <center><h2 className="text-2xl text-[#f15a22] font-semibold">LOCKER</h2></center>
                    <center><h1 className="text-2xl mt-10 font-semibold mb-4">Welcome to myLOCKER</h1></center>
                    <center><p className="mb-6 text-gray-600">Sign in to continue using the app</p></center>

                    <form onSubmit={handleLogin}>
                        {/* Tên người dùng */}
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                prefix={<UserOutlined />}
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div className="input-group mt-4">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                prefix={<LockOutlined />}
                            />
                        </div>

                        {/* Checkbox "Nhớ tôi" */}
                        <div className="mt-4 flex justify-between items-center">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <a href="/forgot-password" className="text-sm text-orange-600 hover:underline">Forgot Password?</a>
                        </div>

                        {/* Button Đăng nhập */}
                        <Button
                            type="primary"
                            block
                            className="mt-4 Sign-in"
                            htmlType="submit"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Button Đăng nhập bằng Office 365 */}
                    <Button
                        type="default"
                        block
                        onClick={handleOffice365Login}
                        loading={loading}
                        className="mt-4 custom-office365"
                    >
                        <Office365Icon className="inline-block w-5 h-5 mr-2 fill-white" />
                        Sign in with Office 365
                    </Button>

                    <center>
                        <div className="mt-5 text-orange-600 text-sm">
                            <button
                                className="hover:text-[#ff8153]"
                                onClick={() => console.log('Download the app')}
                            >
                                Download mobile app
                            </button>
                        </div>
                    </center>

                    {/* Hỗ trợ email */}
                    <div className="mt-6 mt-16 text-gray-600 text-sm">
                        <p>If you have login issues, please contact IT Helpdesk</p>
                        <center>
                            <MailOutlined className="text-[#f15a22] w-6 h-6" />
                            <a href="mailto:support@mylocker.com.vn" className="text-orange-600 hover:underline">
                                support@mylocker.com.vn
                            </a>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
