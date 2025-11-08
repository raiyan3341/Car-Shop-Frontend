import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import ErrorPage from '../pages/ErrorPage/ErrorPage'; // 404 Page (Requirement)
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";
import BrowseCars from "../pages/BrowseCars";
import CarDetails from "../pages/CarDetails";
import PrivateRoute from "../pages/Root/PrivateRoute";
 // Import PrivateRoute

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, // Navbar/Footer will be absent here (Requirement)
    children: [
      {
        path: "/",
        element: <Home />, // Home Page Requirements
      },
      {
        path: "/browse",
        element: <BrowseCars />, // Public Route
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
        element: <PrivateRoute><AddCar /></PrivateRoute>, // Private Route (Requirement)
      },
      {
        path: "/my-listings",
        element: <PrivateRoute><MyListings /></PrivateRoute>, // Private Route (Requirement)
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>, // Private Route (Requirement)
      },
      {
        path: "/car/:id",
        // Note: Car Details is specified as Private Route
        element: <PrivateRoute><CarDetails /></PrivateRoute>, 
      },
      // Optional: Update Car route, often handled via modal on MyListings, but included for completeness
      {
        path: "/update-car/:id",
        element: <PrivateRoute><AddCar isUpdate={true} /></PrivateRoute> 
      }
    ]
  },
  // Note: The ErrorPage is already defined as the errorElement of the root route.
]);