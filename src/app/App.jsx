import "./App.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import AppRoutes from "./app.routes";
import SubNav from "../components/SubNav";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </Router>
  );
}
export default App;
