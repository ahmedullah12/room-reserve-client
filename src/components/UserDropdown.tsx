import { logOut, TUser } from "@/redux/features/auth/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hook";

type TUserDropdown = {
  user: TUser;
};

const UserDropdown = ({ user }: TUserDropdown) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger className="px-2 py-1 flex items-center gap-2 text-white rounded">
          <FaUserTie /> {user.name}
        </PopoverTrigger>
        <PopoverContent className="w-32 bg-accent border-none">
          {user.role === "user" ? (
            <Link className="hover:underline" to="/my-bookings">
              My Bookings
            </Link>
          ) : (
            <Link className="hover:underline" to="/dashboard">
              Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 px-2 py-1 text-sm bg-primary text-white rounded"
          >
            Logout
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserDropdown;
