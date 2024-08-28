import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  items: Array<{ name: string; path: string }>;
  isOpen: boolean;
  toggleOpen: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  items,
  isOpen,
  toggleOpen,
}) => {
  const location = useLocation();

  const isActive = items.some((item) => item.path === location.pathname);

  return (
    <div
      className={`mb-4 ${
        isActive ? "bg-primary bg-opacity-10 rounded-md" : ""
      }`}
    >
      <button
        onClick={toggleOpen}
        className={`flex items-center justify-between w-full p-2 text-left text-white font-semibold
        `}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {isOpen && (
        <div className="ml-4">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block px-4 py-2 text-white ${
                location.pathname === item.path
                  ? "bg-primary  rounded-md"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
