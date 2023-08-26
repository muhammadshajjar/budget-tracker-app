import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AuthContextProvider from "./context/auth-context.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
