import { useState } from "react";
import "./Analytics.css";

//services

import { useGetExpenseTrendsQuery } from "../../store/services";

//ant design
import { Card, Tabs, Spin, Space, Empty } from "antd";
const { TabPane } = Tabs;
import { Line } from "@ant-design/charts";

//Libraries

import moment from "moment";

const Analytics = () => {
  const [activeTabDate, setActiveTabDate] = useState({
    active: "1",
    date: moment().subtract(1, "months").format("YYYY-MM-DD"),
  });

  const { data: trends, isFetching } = useGetExpenseTrendsQuery(
    activeTabDate.date
  );

  const activeTabChangeHandler = (value) => {
    const oneMonthAgo = moment().subtract(1, "months").format("YYYY-MM-DD");
    const sixMonthsAgo = moment().subtract(6, "months").format("YYYY-MM-DD");
    const twelveMonthsAgo = moment()
      .subtract(12, "months")
      .format("YYYY-MM-DD");

    if (value === "1") {
      setActiveTabDate({ active: value, date: oneMonthAgo });
    }
    if (value === "6") {
      setActiveTabDate({ active: value, date: sixMonthsAgo });
    }
    if (value === "12") {
      setActiveTabDate({ active: value, date: twelveMonthsAgo });
    }
  };

  const config = {
    data: trends,
    padding: "auto",
    xField: "date",
    yField: "price",
    xAxis: {
      nice: true,
      line: { style: { stroke: "#fdc414", width: "2px" } },
    },
  };

  return (
    <Card className="cards-container">
      <Tabs activeKey={activeTabDate.active} onChange={activeTabChangeHandler}>
        <TabPane tab="Last Month" key="1" />
        <TabPane tab="Last 6 Months" key="6" />
        <TabPane tab="Last 12 Months" key="12" />
      </Tabs>
      <div className="loader-contanier">
        {isFetching && (
          <Space>
            <Spin size="large" tip="Fetching Trends" />
          </Space>
        )}
      </div>
      {!isFetching && trends.length > 0 && <Line {...config} />}
      {!isFetching && trends.length === 0 && <Empty />}
    </Card>
  );
};

export default Analytics;
