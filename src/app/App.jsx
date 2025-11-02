import "./App.css";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <ProductDetailsPage />
      <SubNav />
    </>
  );
}
export default App;
