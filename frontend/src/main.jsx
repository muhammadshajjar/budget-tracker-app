import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AuthContextProvider from "./context/auth-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
