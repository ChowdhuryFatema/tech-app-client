
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProducts from "../pages/Dashboard/users/MyProducts/MyProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ProductReview from "../pages/Dashboard/Moderator/ProductReview/ProductReview";
import AddProducts from "../pages/Dashboard/users/AddProduct/AddProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ReportedProducts from "../pages/Dashboard/Moderator/ProductReview/ReportedProducts/ReportedProducts";
import Products from "../pages/Products/Products";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        },
        {
          path: '/products',
          element: <Products></Products>
        },
        {
          path: '/productDetails/:id',
          element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
      ],
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'myProducts',
          element: <MyProducts></MyProducts>
        },
        {
          path: 'addProduct',
          element: <AddProducts></AddProducts>
        },

        // moderator route
        {
          path: 'productReview',
          element: <ProductReview></ProductReview>
        },
        {
          path: 'reportedProducts',
          element: <ReportedProducts></ReportedProducts>
        },

        // Admin route
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        }
      ]
    }
  ]);
  
  export default router;