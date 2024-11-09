import Loader from "@/components/Loader";
import DeleteModal from "@/components/modals/DeleteModal";
import {
  useDeleteRoomMutation,
  useGetAllRoomsQuery,
} from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/global";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [openDeleteModals, setOpenDeleteModals] = useState<{ [key: string]: boolean }>({});

  const { data: rooms, isLoading } = useGetAllRoomsQuery({});
  const [deleteRoom] = useDeleteRoomMutation();

  const handleDeleteRoom = async (id: string) => {
    const res = await deleteRoom(id).unwrap();
    if(res.success){
      toast.success("Room is deleted successfully!!!");
      setOpenDeleteModals(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModals(prev => ({ ...prev, [id]: true }));
  };

  const handleCloseDeleteModal = (id: string) => {
    setOpenDeleteModals(prev => ({ ...prev, [id]: false }));
  };

  if (isLoading) return <Loader/>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Room List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/rooms/create">
          <button className=" px-3 py-2 bg-primary hover:bg-secondary text-white text-xs md:text-sm font-semibold rounded-md">Create Room</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent ">
            <tr>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Room Name
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Room No.
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Floor No.
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Capacity
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Price Per Slot
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
          {rooms?.data?.map((room: TRoom) => (
              <tr key={room._id}>
                <td className="py-4 px-4 border-b">{room.name}</td>
                <td className="px-4 border-b">{room.roomNumber}</td>
                <td className="px-4 border-b">{room.floorNo}</td>
                <td className="px-4 border-b">{room.capacity}</td>
                <td className="px-4 border-b">
                  {room.pricePerSlot}
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <Link
                    to={`${
                      room.isDeleted
                        ? ""
                        : `/dashboard/rooms/update/${room._id}`
                    }`}
                    className={`mr-2 mb-1 md:mb-0 px-2 py-[6px] ${
                      room.isDeleted
                        ? "bg-gray-300"
                        : "bg-primary hover:bg-secondary"
                    } text-sm text-white rounded `}
                  >
                    Update
                  </Link>
                  <DeleteModal
                    title={`Delete ${room.name}?`}
                    id={room._id}
                    method={handleDeleteRoom}
                    isDeleted={room.isDeleted}
                    open={openDeleteModals[room._id] || false}
                    setOpen={(open) => open ? handleOpenDeleteModal(room._id) : handleCloseDeleteModal(room._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;
