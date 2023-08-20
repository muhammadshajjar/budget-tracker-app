import "./Authentication.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { Row, Col, Card } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import illustration from "../../assets/login-illustration.png";

const Authentication = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      navigate("/budget");
    }
  }, [token, navigate]);

  return (
    <Card bordered={false} className="card">
      <Row justify="space-between" className="card__content">
        <Col span={8} className="card__left">
          <h3>Start your journey with us</h3>
          <img src={illustration} alt="Login Illustration" />
        </Col>
        <Col span={16} className="card__right">
          <Outlet />
        </Col>
      </Row>
    </Card>
  );
};

export default Authentication;
