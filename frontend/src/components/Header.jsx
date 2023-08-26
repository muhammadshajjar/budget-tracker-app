import { useContext } from "react";
import "./Header.css";

import { Avatar, Row, Col, Dropdown } from "antd";
import logo from "../assets/logo.png";

import { AuthContext } from "../context/auth-context";
import { NavLink } from "react-router-dom";

import { AiOutlineUser, AiOutlineDashboard } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdOutlineAnalytics } from "react-icons/md";

import { useDispatch } from "react-redux";

import { budgetApi } from "../store/services";

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const disptach = useDispatch();

  const logoutHandler = () => {
    console.log("CALLED");
    disptach(budgetApi.util.resetApiState());
    logout();
  };
  const items = [
    {
      key: "1",
      label: (
        <NavLink
          to="/budget"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
      ),
      icon: <AiOutlineDashboard />,
    },
    {
      key: "2",
      label: (
        <NavLink
          to="/analytics"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Analytics
        </NavLink>
      ),
      icon: <MdOutlineAnalytics />,
    },
    {
      key: "3",
      label: <button onClick={logoutHandler}>Logout</button>,
      icon: <CiLogout />,
    },
  ];
  return (
    <header>
      <Row className="container" justify="space-between" align="middle">
        <Col>
          <Row align="middle" className="logo">
            <img src={logo} alt="Company Logo" />
            <span>Budget Tracker</span>
          </Row>
        </Col>
        {token && (
          <Col>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="profile"
            >
              <Avatar
                style={{ backgroundColor: "#fdc414" }}
                icon={<AiOutlineUser />}
                size="large"
              />
            </Dropdown>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;
