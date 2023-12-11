import "./App.css";
import Nav from "./layout/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Admin from "./pages/admin/Admin";
import Product from "./routes/product/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "./routes/create/Create";
import Manage from "./routes/manage/Manage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="product-view/:id" element={<Product />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="create" element={<Create />} />
          <Route path="manage" element={<Manage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
