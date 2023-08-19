import { Row, Col, Card } from "antd";
import { Outlet } from "react-router-dom";
import "./Authentication.css";

import illustration from "../../src/assets/login-illustration.png";

const Authentication = () => {
  return (
    <Card bordered={false} className="card">
      <Row justify="space-between" className="card__content">
        <Col span={8} className="card__left">
          <h3>Start your journey with us</h3>
          <img src={illustration} alt="Login Illustration" />
        </Col>
        <Col span={15} className="card__right">
          <Outlet />
        </Col>
      </Row>
    </Card>
  );
};

export default Authentication;
