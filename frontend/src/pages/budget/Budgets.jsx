import { useEffect, useState } from "react";
import "./Budgets.css";

//services

import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetAllExpenseQuery,
  useUpdateExpenseMutation,
} from "../../store/services";

//ant design

import {
  Dropdown,
  Table,
  Card,
  Row,
  Col,
  DatePicker,
  Button,
  Modal,
  notification,
} from "antd";

//icons
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

//components

import AddUpdateBudgetForm from "../../components/AddBudgetForm";

const Analytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tabelParams, setTabelParams] = useState({
    pageSize: 5,
    current: 1,
    showSizeChanger: true,
  });
  const { data, error, isLoading, isFetching } =
    useGetAllExpenseQuery(tabelParams);
  const [deleteExpense, { isLoading: deleting }] = useDeleteExpenseMutation();
  const [addExpense, { isLoading: uploading }] = useAddExpenseMutation();
  const [updateExpense, { isLoading: updating }] = useUpdateExpenseMutation();
  const [editRowData, setEditRowData] = useState(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "expenseName",
      key: "expenseName",
    },
    {
      title: "Price",
      dataIndex: "expensePrice",
      key: "expensePrice",
    },
    {
      title: "Date",
      dataIndex: "expenseDate",
      key: "expenseDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <button onClick={() => setEditRowData(record)}>Edit</button>
                ),
              },
              {
                key: "2",
                label: (
                  <button onClick={deleteExpenseHandler.bind(null, record._id)}>
                    Delete
                  </button>
                ),
              },
            ],
          }}
        >
          <BiDotsVerticalRounded />
        </Dropdown>
      ),
    },
  ];

  if (error) {
    notification.error({ message: "Something Went Wrong!" });
  }
  useEffect(() => {
    if (data && data?.totalExpenses !== undefined) {
      setTabelParams((prevParams) => ({
        ...prevParams,
        total: data?.totalExpenses,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (editRowData) {
      setIsModalOpen(true);
    }
  }, [editRowData]);

  const tabelParamsChangeHandler = (pagination) => {
    setTabelParams(pagination);
  };

  const deleteExpenseHandler = async (id) => {
    deleteExpense(id);
    notification.success({ message: "Budget Deleted Successfully!" });
  };
  const filterDate = (values) => {
    if (values) {
      const formatedDate = `${values["$y"]}-${values["$M"] + 1}-${
        values["$D"]
      }`;

      setSelectedDate(formatedDate);
    }
    if (!values) {
      setTabelParams((prevParams) => {
        return { ...prevParams, expenseDate: "" };
      });
    }
  };

  const filterByDateHandler = () => {
    setTabelParams((prevParams) => {
      return {
        ...prevParams,
        expenseDate: selectedDate,
      };
    });
  };
  const addBudgetHandler = (data) => {
    addExpense(data);
    notification.success({ message: "Budget Added Successfully!" });
    setIsModalOpen(false);
  };

  const editBudgetHandler = (data) => {
    const id = editRowData._id;
    updateExpense({ id, data });
    notification.success({ message: "Budget Updated Successfully!" });
    setEditRowData(null);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditRowData(null);
  };
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <Card bordered={false} className="cards-container">
      <Row justify="space-between" className="budgets__action">
        <Col>
          <Row>
            <DatePicker className="date-picker" onChange={filterDate} />
            <Button
              type="primary"
              className="primaryBtn btn"
              onClick={filterByDateHandler}
            >
              Filter Records
            </Button>
          </Row>
        </Col>

        <Col>
          <Button
            type="primary"
            className="secondaryBtn btn"
            onClick={openModalHandler}
          >
            Add Budget
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="_id"
        dataSource={data?.expenses}
        columns={columns}
        pagination={tabelParams}
        onChange={tabelParamsChangeHandler}
        loading={isLoading || deleting || uploading || updating || isFetching}
      />
      <Modal
        title={
          <div className="modal-header">
            <span>{editRowData ? <p>Edit Budget</p> : <p>Add Budget</p>}</span>
            <GrClose className="close-icon" onClick={handleCancel} />
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
      >
        <AddUpdateBudgetForm
          onFromSubmit={editRowData ? editBudgetHandler : addBudgetHandler}
          editRowData={editRowData}
          onUploading={uploading}
        />
      </Modal>
    </Card>
  );
};

export default Analytics;
