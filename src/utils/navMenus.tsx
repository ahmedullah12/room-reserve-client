import { FaHome } from "react-icons/fa";
import { MdMeetingRoom, MdOutlineDescription } from "react-icons/md";
import { TiContacts } from "react-icons/ti";

export const Menus = [
  { title: "Home", path: "/", icon: <FaHome size={18} color="#674188" /> },
  {
    title: "Meeting Rooms",
    path: "/meeting-rooms",
    icon: <MdMeetingRoom size={18} color="#674188" />,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <MdOutlineDescription size={18} color="#674188" />,
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <TiContacts size={18} color="#674188" />,
  },
];
