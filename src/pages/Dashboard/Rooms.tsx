import { Button } from "@/components/ui/button";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/global";
import { Link } from "react-router-dom";

const Rooms = () => {
  const { data: rooms, isLoading } = useGetAllRoomsQuery({});
  console.log(rooms);
  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Room List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/rooms/create">
          <Button className="bg-primary">Create Room</Button>
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
                <td className="py-3 px-4 border-b border-r">{room.name}</td>
                <td className="py-2 px-4 border-b border-r">{room.roomNo}</td>
                <td className="py-2 px-4 border-b border-r">{room.floorNo}</td>
                <td className="py-2 px-4 border-b border-r">{room.capacity}</td>
                <td className="py-2 px-4 border-b border-r">
                  {room.pricePerSlot}
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <Link
                    to={`/dashboard/rooms/update/${room._id}`}
                    className="mr-2 mb-1 md:mb-0 px-2 py-1 bg-primary text-sm text-white rounded hover:bg-secondary"
                  >
                    Update
                  </Link>
                  <button className="px-2 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600">
                    Delete
                  </button>
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
