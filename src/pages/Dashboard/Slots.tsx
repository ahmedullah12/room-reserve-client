import { useState } from "react";
import toast from "react-hot-toast";
import CreateSlot from "@/components/modals/CreateSlot";
import DeleteModal from "@/components/modals/DeleteModal";
import UpdateSlot from "@/components/modals/UpdateSlot";
import {
  useDeleteSlotMutation,
  useGetAvailableSlotsQuery,
} from "@/redux/features/slots/slotsApi";
import { TSlot } from "@/types/global";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

const Slots = () => {
  const [openDeleteModals, setOpenDeleteModals] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 8;

  const { data: slotsData, isLoading } = useGetAvailableSlotsQuery({
    page: currentPage,
    limit: slotsPerPage,
  });

  const [deleteSlot] = useDeleteSlotMutation();

  const handleDeleteSlot = async (id: string) => {
    const res = await deleteSlot(id).unwrap();
    if (res.success === true) {
      toast.success("Slot is deleted successfully!!!");
      setOpenDeleteModals((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModals((prev) => ({ ...prev, [id]: true }));
  };

  const handleCloseDeleteModal = (id: string) => {
    setOpenDeleteModals((prev) => ({ ...prev, [id]: false }));
  };

  if (isLoading) return <Loader />;

  const meta = slotsData?.meta;

  const totalPages = Math.ceil(meta.total / slotsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Slots List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="flex justify-end mb-4">
        <CreateSlot />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent">
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
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Status
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {slotsData?.data.map((slot: TSlot) => (
              <tr key={slot._id}>
                <td className="py-4 px-4 border-b">{slot.room.name}</td>
                <td className="px-4 border-b">{slot.room.roomNumber}</td>
                <td className="px-4 border-b">{slot.date}</td>
                <td className="px-4 border-b">{slot.startTime}</td>
                <td className="px-4 border-b">{slot.endTime}</td>
                <td className="px-4 border-b">
                  {slot.isBooked === true ? (
                    <span className="px-2 py-1 bg-accent text-sm rounded-lg">
                      Booked
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-accent text-sm rounded-lg">
                      Not booked
                    </span>
                  )}
                </td>
                <td className="px-4 border-b">
                  <UpdateSlot isBooked={slot.isBooked} initialData={slot} />
                  <DeleteModal
                    title={`this ${slot.room.name} slot?`}
                    id={slot._id}
                    method={handleDeleteSlot}
                    isDeleted={slot.isDeleted}
                    isBooked={slot.isBooked}
                    open={openDeleteModals[slot._id] || false}
                    setOpen={(open) =>
                      open
                        ? handleOpenDeleteModal(slot._id)
                        : handleCloseDeleteModal(slot._id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="bg-primary opacity-10 h-[1px] w-full mt-8 mb-4" />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Slots;
