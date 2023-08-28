import { useContext, useState } from "react";
import { Button, Form, Input, notification } from "antd";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

const LOGINAPIURL = "http://127.0.0.1:8000/api/v1/login";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const formSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(LOGINAPIURL, {
        userEmail: values.email,
        password: values.password,
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
        Dont have an account? <Link to="/">SignUp now</Link>{" "}
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
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your valid email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" className="input" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" className="input" />
        </Form.Item>
        <div className="auth-btn">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Login In
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default LoginForm;
