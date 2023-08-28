import { useContext, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth-context";

const SIGNUPAPIURL = "http://127.0.0.1:8000/api/v1/signup";

const SignupForm = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(SIGNUPAPIURL, {
        firstName: values.firstname,
        lastName: values.lastname,
        userEmail: values.email,
        password: values.password,
        budgetLimit: values.budgetlimit,
      });

      authCtx.login(response.data.token);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notification.error({
        message: err?.response?.data?.message || "An error occurred.",
      });
    }
  };
  return (
    <div className="form">
      <p>
        Already have an account? <Link to="/login">Login now</Link>{" "}
      </p>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={formSubmitHandler}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          hasFeedback
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter your First name!",
            },
          ]}
        >
          <Input placeholder="First Name" className="input" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter your Last name!",
            },
          ]}
        >
          <Input placeholder="Last Name" className="input" />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
        >
          <Input placeholder="Email" className="input" />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            { min: 8, message: "Password must be minimum 8 characters." },
          ]}
        >
          <Input.Password placeholder="Password" className="input" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" className="input" />
        </Form.Item>

        <Form.Item
          name="budgetlimit"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your budget limit!",
            },
            () => ({
              validator(_, value) {
                if (!value || !isNaN(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Please enter only numbers!"));
              },
            }),
          ]}
        >
          <Input placeholder="Budget Limit" className="input" />
        </Form.Item>
        <div className="auth-btn">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
