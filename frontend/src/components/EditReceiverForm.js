import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';


const { Option } = Select;

const EditReceiverForm = ({ visible, onEdit, onCancel, packageData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (packageData) {
      // Load the current package data into the form
      form.setFieldsValue({
        senderId: packageData.senderId,
        destination: packageData.destination,
        receiverPhoneNumber: packageData.receiverPhoneNumber,
        lockerId: packageData.lockerId,
        shipperId: packageData.shipperId,
        sendingDate: packageData.sendingDate ? moment(packageData.sendingDate) : null, // moment.js to handle date
        status: packageData.status,
      });
    }
  }, [packageData, form]);

  return (
    <Modal
      centered
      visible={visible}
      title="Edit Package"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onEdit(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="edit_package_form">
        <Form.Item
          name="senderId"
          label="Sender ID"
          rules={[
            {
              required: true,
              message: 'Please enter the sender ID!',
            },
          ]}
        >
          <Input placeholder="Enter sender ID" />
        </Form.Item>

        <Form.Item
          name="destination"
          label="Destination"
          rules={[
            {
              required: true,
              message: 'Please enter the destination!',
            },
          ]}
        >
          <Input placeholder="Enter destination address" />
        </Form.Item>

        <Form.Item
          name="receiverPhoneNumber"
          label="Receiver Phone Number"
          rules={[
            {
              required: true,
              message: 'Please enter the receiver\'s phone number!',
            },
          ]}
        >
          <Input placeholder="Enter receiver phone number" />
        </Form.Item>

        <Form.Item
          name="lockerId"
          label="Locker ID"
          rules={[
            {
              required: true,
              message: 'Please enter the locker ID!',
            },
          ]}
        >
          <Input placeholder="Enter locker ID" />
        </Form.Item>

        <Form.Item
          name="shipperId"
          label="Shipper ID"
          rules={[
            {
              required: true,
              message: 'Please enter the shipper ID!',
            },
          ]}
        >
          <Input placeholder="Enter shipper ID" />
        </Form.Item>

        <Form.Item
          name="sendingDate"
          label="Sending Date"
          rules={[
            {
              required: true,
              message: 'Please select the sending date!',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: 'Please select the status!',
            },
          ]}
        >
          <Select placeholder="Select status">
            <Option value="stored">Stored</Option>
            <Option value="picked">Picked</Option>
            <Option value="delivered">Delivered</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditReceiverForm;
