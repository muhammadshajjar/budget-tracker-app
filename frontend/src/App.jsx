import Authentication from "../pages/authentication/Authentication";
import Budget from "../pages/budget/Budgets";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Analytics from "../pages/analytics/Analytics";
import { ConfigProvider } from "antd";

import LoginFrom from "../components/LoginFrom";
import SignupForm from "../components/SignupForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <p>Page not found!!</p>,
    children: [
      {
        path: "/",
        element: <Authentication />,
        children: [
          { index: true, element: <SignupForm /> },
          { path: "login", element: <LoginFrom /> },
        ],
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Montserrat",
          fontSize: "16px",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
