import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const authenticatedUser = useContext(AuthContext);
  if (!authenticatedUser.token) {
    return <Navigate to="/" replace={true} />;
  } else return children;
};

export default ProtectedRoutes;
