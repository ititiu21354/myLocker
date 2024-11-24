import React from "react";
import { Form, Input, Button } from "antd";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-container">
      {/* Header */}
      <header className="help-header">
        <h1>Help</h1>
        <span1>Welcome,</span1>
        <span2>Admin!</span2>
      </header>

      {/* Content */}
      <div className="help-content">
        {/* Left Section */}
        <div className="help-left">
          {/* FAQs */}
          <div className="help-section">
            <h2>FAQs</h2>
            <ul>
              <li>What is MyLocker?</li>
              <li>Who should use MyLocker?</li>
              <li>Is MyLocker free to use?</li>
              <li>What features does MyLocker offer?</li>
              <li>Is my data secure on MyLocker?</li>
              <li>Can MyLocker integrate with existing systems?</li>
              <li>Can I transfer my locker to someone else?</li>
            </ul>
          </div>

          {/* User Manuals */}
          <div className="help-section">
            <h2>User manuals</h2>
            <ul>
              <li>Administrator Manual</li>
              <li>User Manual (General Users)</li>
              <li>Maintenance Staff Manual</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="help-section">
            <h2>Contacts</h2>
            <ul>
              <li>Zalo: XXX - XXX - XXX</li>
              <li>Facebook: facebook.com/xxx</li>
              <li>Linkedin: XXX.com</li>
              <li>Website: XXX.com</li>
              <li>Hotline: XXX - XXX - XXX</li>
              <li>Mail: XXX@mylocker.com</li>
            </ul>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="help-right">
          <h2>Contact Us</h2>
          <Form
            layout="vertical"
            onFinish={(values) => {
              console.log("Form Data:", values);
            }}
          >
            <Form.Item
              label="Your name/company"
              name="name"
              rules={[{ required: true, message: "Please enter your name or company!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Your email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Your phone number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                { pattern: /^\d+$/, message: "Please enter a valid phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Content (at least 50 words)"
              name="content"
              rules={[
                { required: true, message: "Please enter your message!" },
                { min: 50, message: "Your message must be at least 50 words!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="help-submit">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Help;
