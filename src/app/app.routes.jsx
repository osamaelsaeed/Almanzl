import { Routes, Route } from "react-router-dom";

// Admin Dashboard Pages
import DashboardLayout from "../pages/admin-dashboard/components/layout/DashboardLayout";
import Products from "../pages/admin-dashboard/Products";
import Orders from "../pages/admin-dashboard/Orders";
import Dashboard from "../pages/admin-dashboard/Dashboard";
import Categories from "../pages/admin-dashboard/Categories";
import AddCategory from "../pages/admin-dashboard/AddCategory";
import AddProduct from "../pages/admin-dashboard/AddProduct";
import UsersTable from "../pages/admin-dashboard/components/tables/Users";
import MainLayout from "./Layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<h1>home</h1>} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Route>

      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
        <Route path="orders" element={<Orders />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="add" element={<AddCategory />} />
        </Route>

        <Route path="users" element={<UsersTable />} />
      </Route>

      <Route path="*" element={<h2>❌ 404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
