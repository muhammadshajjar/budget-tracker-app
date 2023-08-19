import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const SignupForm = () => {
  const formSubmitHandler = (values) => {
    console.log("Success:", values);
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
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your First name!",
            },
          ]}
        >
          <Input placeholder="First Name" className="input" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
          ]}
        >
          <Input placeholder="Last Name" className="input" />
        </Form.Item>
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
        <Form.Item
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" className="input" />
        </Form.Item>

        <Form.Item
          name="budgetlimit"
          rules={[
            {
              required: true,
              message: "Please add your budget limit!",
            },
          ]}
        >
          <Input placeholder="Budget Limit" className="input" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
