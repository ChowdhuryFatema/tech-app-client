
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
import Update from "../pages/Dashboard/users/MyProducts/Update";
import MyProfile from "../pages/Dashboard/users/MyProfile/MyProfile";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons/ManageCoupons";

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
          path: 'myProfile',
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        },
        {
          path: 'myProducts',
          element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
        },
        {
          path: 'addProduct',
          element: <PrivateRoute><AddProducts></AddProducts></PrivateRoute>
        },
        {
          path: 'update/:id',
          element: <PrivateRoute><Update></Update></PrivateRoute>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
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
          path: 'statistics',
          element: <Statistics></Statistics>
        },
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'manageCoupons',
          element: <ManageCoupons></ManageCoupons>
        }
      ]
    }
  ]);
  
  export default router;