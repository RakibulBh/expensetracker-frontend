import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import { ExpensesContextProvider } from "./context/ExpensesContext.jsx";

import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpensesContextProvider>
        <App />
      </ExpensesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
