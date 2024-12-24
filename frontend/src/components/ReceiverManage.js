import React, { useEffect, useState } from "react";
import {
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Avatar, Button, message, Space, Table, Input } from "antd";
import './ReceiverManage.css';
import AddReceiverForm from "./AddReceiverForm";
import EditReceiverForm from "./EditReceiverForm";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const ReceiverManage = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleAvatarClick = () => {
        navigate('/profile');
    };

    const fetchSuppliers = async () => {
        setLoading(true); // Show loading indicator
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/suppliers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fetchedSuppliers = response.data.map(supplier => ({
                key: supplier.id,
                name: supplier.name,
                contact: supplier.contact_info,
                address: supplier.address
            }));
            setSuppliers(fetchedSuppliers);
        } catch (error) {
            console.error('Error fetching receiver:', error);
            message.error('Failed to fetch receiver');
        }
        setLoading(false); // Hide loading indicator
    };

    const showAddSupplierModal = () => {
        setIsAddModalVisible(true);
    };

    const showEditSupplierModal = (key) => {
        const supplierToEdit = suppliers.find(supplier => supplier.key === key);
        setCurrentSupplier(supplierToEdit);
        setIsEditModalVisible(true);
    };

    const handleAddSupplier = async (values) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/suppliers`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuppliers([...suppliers, {
                key: response.data.id,
                name: response.data.name,
                contact: response.data.contact_info,
                address: response.data.address
            }]);
            message.success("Supplier added successfully.");
            setIsAddModalVisible(false);
        } catch (error) {
            console.error("Error adding receiver:", error);
            message.error("Failed to add receiver.");
        }
    };

    const handleEditSupplier = async (values) => {
        try {
            const token = sessionStorage.getItem('token');
            const payload = {
                name: values.name,
                contact_info: values.contact_info,
                address: values.address
            };

            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/suppliers/${currentSupplier.key}`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const updatedSuppliers = suppliers.map(sup =>
                sup.key === currentSupplier.key ? { ...sup, ...payload } : sup
            );
            setSuppliers(updatedSuppliers);
            message.success("Receiver updated successfully.");
            setIsEditModalVisible(false);
        } catch (error) {
            console.error("Error updating receiver:", error);
            message.error("Failed to update receiver.");
        }
    };

    const handleCancelAdd = () => {
        setIsAddModalVisible(false);
    };

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };

    const deleteSupplier = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/suppliers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuppliers(suppliers.filter(supplier => supplier.key !== id));
            message.success("Receiver deleted successfully.");
        } catch (error) {
            console.error("Error deleting receiver:", error);
            message.error("Failed to delete receiver.");
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} style={{ borderRadius: 50 }} onClick={() => showEditSupplierModal(record.key)}>Edit</Button>
                    <Button icon={<DeleteOutlined />} style={{ borderRadius: 50 }} danger onClick={() => deleteSupplier(record.key)}>Delete</Button>
                </Space>
            )
        }
    ];

    const onSearch = (value) => {
        const filteredSuppliers = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuppliers(filteredSuppliers);
    };

    return (
        <div className="receiver-container">
            {/* Sidebar Navigation */}
            <AdminSidebar /> 

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <h1>Receiver Management</h1>
                        <p>Dashboard / Receiver Management</p>
                    </div>
                    <div className="header-right">
                        <div onClick={handleAvatarClick} className="avatar-wrapper">
                            <Avatar size={50} icon={<UserOutlined />} />
                        </div>
                    </div>
                </header>

                <section className="receiver-table">
                    <section className="table-header">
                        <div className="flex items-center gap-4">
                            <Button
                                className="add-button"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={showAddSupplierModal}
                            >
                                Add Receiver
                            </Button>
                            <Input.Search
                                placeholder="Search sender (type the name)"
                                allowClear
                                onSearch={onSearch}
                                className="search-input"
                            />
                        </div>
                    </section>

                    <Table
                        columns={columns}
                        dataSource={suppliers}
                        rowKey={(record) => record.id}
                        loading={loading}
                    />
                </section>

                <AddReceiverForm
                    visible={isAddModalVisible}
                    onCreate={handleAddSupplier}
                    onCancel={handleCancelAdd}
                />
                <EditReceiverForm
                    visible={isEditModalVisible}
                    onEdit={handleEditSupplier}
                    onCancel={handleCancelEdit}
                    supplier={currentSupplier}
                />
            </main>
        </div>
    );
};

export default ReceiverManage;
