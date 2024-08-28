import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import MeetingRooms from "@/pages/MeetingRooms/MeetingRooms";
import RoomDetails from "@/pages/RoomDetails/RoomDetails";
import BookingForm from "@/pages/BookingForm/BookingForm";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import MyBookings from "@/pages/MyBookings/MyBookings";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Rooms from "@/pages/Dashboard/Rooms"; // Import the Rooms component
import CreateRoom from "@/pages/Dashboard/CreateRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "/meeting-rooms/:id",
        element: <RoomDetails />,
      },
      {
        path: "/booking/:id",
        element: <BookingForm />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "", // Empty string path for the default route
        element: <Navigate to="/dashboard/rooms" replace />, // Redirect to /dashboard/rooms
      },
      {
        path: "/dashboard/rooms",
        element: <Rooms />, // Show Rooms component when navigating to /dashboard/rooms
      },
      {
        path: "/dashboard/rooms/create",
        element: <CreateRoom />, // Show CreateRoom component when navigating to /dashboard/rooms/create
      },
    ],
  },
]);

export default router;
