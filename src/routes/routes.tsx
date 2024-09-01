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
import UpdateRoom from "@/pages/Dashboard/UpdateRoom";
import Slots from "@/pages/Dashboard/Slots";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import BookingList from "@/pages/Dashboard/BookingList";

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
        element: (
          <ProtectedRoute role={undefined}>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:id",
        element: (
          <ProtectedRoute role={undefined}>
            {" "}
            <BookingForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/:bookingId",
        element: (
          <ProtectedRoute role={undefined}>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute role="user">
            <MyBookings />
          </ProtectedRoute>
        ),
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
        path: "",
        element: <Navigate to="/dashboard/rooms" replace />,
      },
      {
        path: "/dashboard/rooms",
        element: (
          <ProtectedRoute role="admin">
            <Rooms />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/rooms/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/rooms/update/:id",
        element: (
          <ProtectedRoute role="admin">
            <UpdateRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/slots",
        element: (
          <ProtectedRoute role="admin">
            <Slots />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/bookings",
        element: (
          <ProtectedRoute role="admin">
            <BookingList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
