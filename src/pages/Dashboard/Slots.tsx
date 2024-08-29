import DeleteModal from "@/components/modals/DeleteModal";
import { Button } from "@/components/ui/button";
import { useDeleteSlotMutation, useGetAvailableSlotsQuery } from "@/redux/features/slots/slotsApi";
import { TSlot } from "@/types/global";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Slots = () => {
  const { data: slots, isLoading } = useGetAvailableSlotsQuery({});
  const [deleteSlot] = useDeleteSlotMutation();
  console.log(slots);

  const handleDeleteSlot = async (id: string) => {
    await deleteSlot(id);
    toast.success("Room is deleted successfully!!!");
  };

  if (isLoading) return <p>Loading....</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Slots List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/rooms/create">
          <Button className="bg-primary">Create Slot</Button>
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
                Date
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Start Time
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                End Time
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {slots?.data?.map((slot: TSlot) => (
              <tr key={slot._id}>
                <td className="py-3 px-4 border-b border-r">{slot.room.name}</td>
                <td className="py-2 px-4 border-b border-r">{slot.room.roomNo}</td>
                <td className="py-2 px-4 border-b border-r">{slot.date}</td>
                <td className="py-2 px-4 border-b border-r">{slot.startTime}</td>
                <td className="py-2 px-4 border-b border-r">
                  {slot.endTime}
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <Link
                    to={`${
                      slots.isDeleted
                        ? ""
                        : `/dashboard/rooms/update/${slots._id}`
                    }`}
                    className={`mr-2 mb-1 md:mb-0 px-2 py-1 ${
                      slots.isDeleted
                        ? "bg-gray-300"
                        : "bg-primary hover:bg-secondary"
                    } text-sm text-white rounded `}
                  >
                    Update
                  </Link>
                  <DeleteModal
                    title={`Delete this slot?`}
                    id={slots._id}
                    method={handleDeleteSlot}
                    isDeleted={slots.isDeleted}
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

export default Slots;
