import { Row, Col } from "antd";
import logo from "../src/assets/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <Row className="container" justify="space-between" align="middle">
        <Col>
          <Row align="middle" className="logo">
            <img src={logo} alt="Company Logo" />
            <span>Budget Tracker</span>
          </Row>
        </Col>
        <Col>Profile</Col>
      </Row>
    </header>
  );
};

export default Header;
