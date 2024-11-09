import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import {
  useGetAllUserQuery,
  useMakeAdminMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/global";
import { useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const { data: users, isLoading } = useGetAllUserQuery({
    page: currentPage,
    limit: usersPerPage,
  });

  const [makeAdmin] = useMakeAdminMutation();

  const handleMakeAdmin = async (id: string) => {
    const res = await makeAdmin(id).unwrap();
    if (res.success === true) {
      toast.success(res.message);
    }
  };
  if (isLoading) return <Loader />;

  const meta = users?.meta;

  const totalPages = Math.ceil(meta.total / usersPerPage);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent">
            <tr>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Name
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Email
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Phone
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Role
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user: TUser) => (
              <tr key={user._id}>
                <td className="py-4 px-4 border-b">{user.name}</td>
                <td className="px-4 border-b">{user.email}</td>
                <td className="px-4 border-b">{user.phone}</td>
                <td className="px-4 border-b">{user.role}</td>

                <td className="px-4 border-b">
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="mr-2 mb-1 md:mb-0 px-2 py-1 bg-primary hover:bg-secondary text-sm text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={user.role === "admin"}
                  >
                    {user.role === "user" ? "Make Admin" : "Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {meta.total > usersPerPage && (
          <>
            <div className="bg-primary opacity-10 h-[1px] w-full mt-8 mb-4" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
