import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // Specify the type of sidebarRef as HTMLDivElement or null
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    // Explicitly type the event as MouseEvent
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Navbar */}
      <nav className="bg-accent shadow-md md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="text-2xl text-primary font-semibold italic"
                >
                  RoomReserve
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {showSidebar ? (
                  <X color="black" className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu color="black" className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 md:w-80 bg-secondary overflow-y-auto transition-transform duration-300 ease-in-out transform 
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0`}
      >
        <div className="p-4">
          <p className="text-white">Sidebar Content</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow overflow-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
