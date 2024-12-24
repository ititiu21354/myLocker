import React from 'react';
import { Modal, Form, Input } from 'antd';
//AddPackgeForm.js
const AddReceiverForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            centered
            visible={visible}
            title="Add Receiver"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="add_supplier_form"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the name!',
                        },
                    ]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    name="contact_info"
                    label="Contact"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the supplier email!',
                        },
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the supplier address!',
                        },
                    ]}
                >
                    <Input placeholder="Enter address" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddReceiverForm;
