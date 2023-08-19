import { Button, Form, Input } from "antd";
import "./LoginForm.css";

import { Link } from "react-router-dom";

const LoginForm = () => {
  const formSubmitHandler = (values) => {
    console.log("Success:", values);
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

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
