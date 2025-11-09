import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";
import BrowseCars from "../pages/BrowseCars";
import CarDetails from "../pages/CarDetails";
import PrivateRoute from "../pages/Root/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path: "/browse",
        element: <BrowseCars />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-car",
        element: <PrivateRoute><AddCar /></PrivateRoute>,
      },
      {
        path: "/my-listings",
        element: <PrivateRoute><MyListings /></PrivateRoute>,
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>,
      },
      {
        path: "/car/:id",
        element: <PrivateRoute><CarDetails /></PrivateRoute>, 
      },
      {
        path: "/update-car/:id",
        element: <PrivateRoute><AddCar isUpdate={true} /></PrivateRoute> 
      }
    ]
  },
]);