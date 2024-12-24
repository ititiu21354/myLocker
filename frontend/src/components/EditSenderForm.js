import React from "react";
import { Modal, Form, Input } from "antd";

const EditSenderForm = ({ visible, onEdit, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    // Khi dữ liệu ban đầu được truyền vào, thiết lập lại giá trị cho form
    React.useEffect(() => {
        if (initialValues) {
            // Đặt lại các giá trị ban đầu cho form
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    return (
        <Modal
            title="Edit Customer"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onEdit(values); // Trả về dữ liệu đã chỉnh sửa
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter the customer's name" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a valid phone number",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditSenderForm;
