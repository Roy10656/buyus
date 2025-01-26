import { createBrowserRouter, Route } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import Allusers from "../Pages/Allusers.js";
import Allproducts from "../Pages/Allproducts.js";
import CategoryProduct from "../Pages/CategoryProduct.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "product-category/:categoryName",
                element: <CategoryProduct />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <Allusers />,
                    },
                    {
                        path: "all-products",
                        element: <Allproducts />
                    }
                ]
            }
        ]
    }
])

export default router;
