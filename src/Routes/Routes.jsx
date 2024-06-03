
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
          path: '/product/:id',
          element: <ProductDetails></ProductDetails>
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

        // Admin route
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        }
      ]
    }
  ]);
  
  export default router;