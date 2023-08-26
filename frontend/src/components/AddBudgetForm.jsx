import { useEffect, useRef } from "react";
import { Button, Form, Input, DatePicker } from "antd";

import moment from "moment";

const AddUpdateBudgetForm = ({ onFromSubmit, onUploading, editRowData }) => {
  const formRef = useRef();

  useEffect(() => {
    if (editRowData) {
      formRef.current.setFieldsValue({
        expenseName: editRowData.expenseName,
        expensePrice: editRowData.expensePrice,
        expenseDate: moment(editRowData.expenseDate, "MM/DD/YYYY"),
      });
    } else {
      formRef.current.setFieldsValue({
        expenseName: "",
        expensePrice: "",
        expenseDate: moment(),
      });
    }
  }, [editRowData]);

  const formSubmitHandler = (values) => {
    const budgetData = {
      expenseName: values.expenseName,
      expensePrice: values.expensePrice,
      expenseDate: new Date(values.expenseDate),
    };
    console.log(budgetData);
    onFromSubmit(budgetData);
  };
  return (
    <Form
      name="basic"
      onFinish={formSubmitHandler}
      autoComplete="off"
      size="large"
      ref={formRef}
    >
      <Form.Item
        name="expenseName"
        rules={[
          {
            required: true,
            message: "Please input your expense name!",
          },
        ]}
      >
        <Input placeholder="Name" className="input" />
      </Form.Item>
      <Form.Item
        name="expensePrice"
        rules={[
          {
            required: true,
            message: "Please input your expense price!",
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
        <Input placeholder="Price" className="input" />
      </Form.Item>
      <Form.Item
        name="expenseDate"
        rules={[
          {
            required: true,
            message: "Please input the date of expense!",
          },
        ]}
      >
        <DatePicker className="input" />
      </Form.Item>
      <div className="auth-btn">
        <Button type="primary" htmlType="submit" loading={onUploading}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddUpdateBudgetForm;
