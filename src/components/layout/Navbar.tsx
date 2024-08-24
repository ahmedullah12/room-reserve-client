import { Link, NavLink } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Menus } from "@/utils/navMenus";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-secondary w-full fixed top-0 z-50 h-16">
      <div className="lg:container mt-2 md:mt-4 relative flex items-center justify-between px-4 md:flex md:justify-between ">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/" className="text-2xl text-primary font-semibold italic">
            RoomReserve
          </Link>
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {Menus.map((item, idx) => (
              <li
                key={idx}
                className="text-white font-semibold text-sm lg:text-base"
              >
                <NavLink
                  className={`px-2 py-1 lg:px-3 lg:py-2 transition-all duration-500 ease-in-out rounded hover:bg-accent hover:text-primary`}
                  to={`${item.path}`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4 relative">
          <Link
            to="/login"
            className=" px-2 py-1 rounded flex items-center gap-1 text-white font-semibold text-sm lg:text-base transition-all duration-500 ease-in-out hover:bg-accent hover:text-primary"
          >
            Login
          </Link>
          <Link
            to="/register"
            className=" px-2 py-1 rounded flex items-center gap-1 text-white font-semibold text-sm lg:text-base transition-all duration-500 ease-in-out hover:bg-accent hover:text-primary"
          >
            Register
          </Link>
        </div>
        <div className="md:hidden">
          <Hamburger color="white" toggled={open} toggle={setOpen} />
        </div>
        <div
          className={`block md:hidden mt-2 bg-white fixed left-0 right-0 transition-all duration-300 ease-in-out ${
            open ? "top-[56px] opacity-100" : "top-[-420px] opacity-0"
          }`}
        >
          <ul className="ps-4 space-y-4">
            {Menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <NavLink
                  className={`px-3 py-2 flex items-center gap-x-3 transition-all duration-700 ease-in-out rounded`}
                  to={item.path}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 ms-2  px-4 pb-3 flex justify-between items-center relative">
            <Link
              to="/login"
              className="bg-primary px-2 py-1 rounded flex items-center gap-1 text-white font-semibold text-xs lg:text-base"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
