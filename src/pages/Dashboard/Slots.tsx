import { useState } from "react";
import toast from "react-hot-toast";
import CreateSlot from "@/components/modals/CreateSlot";
import DeleteModal from "@/components/modals/DeleteModal";
import UpdateSlot from "@/components/modals/UpdateSlot";
import { useDeleteSlotMutation, useGetAvailableSlotsQuery } from "@/redux/features/slots/slotsApi";
import { TSlot } from "@/types/global";

const Slots = () => {
  const [openDeleteModals, setOpenDeleteModals] = useState<{ [key: string]: boolean }>({});

  const { data: slots, isLoading } = useGetAvailableSlotsQuery({});
  const [deleteSlot] = useDeleteSlotMutation();

  const handleDeleteSlot = async (id: string) => {
    const res = await deleteSlot(id).unwrap();
    console.log(res);
    if (res.success === true) {
      toast.success("Slot is deleted successfully!!!");
      setOpenDeleteModals(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModals(prev => ({ ...prev, [id]: true }));
  };

  const handleCloseDeleteModal = (id: string) => {
    setOpenDeleteModals(prev => ({ ...prev, [id]: false }));
  };

  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Slots List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="flex justify-end mb-4">
        <CreateSlot />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent ">
            <tr>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">Room Name</th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">Room No.</th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">Date</th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">Start Time</th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">End Time</th>
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
                <td className="py-2 px-4 border-b border-r">{slot.endTime}</td>
                <td className="py-2 px-4 border-b border-r">
                  <UpdateSlot 
                    initialData={slot}
                  />
                  <DeleteModal
                    title={`this ${slot.room.name} slot?`}
                    id={slot._id}
                    method={handleDeleteSlot}
                    isDeleted={slot.isDeleted}
                    open={openDeleteModals[slot._id] || false}
                    setOpen={(open) => open ? handleOpenDeleteModal(slot._id) : handleCloseDeleteModal(slot._id)}
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