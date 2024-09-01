import DeleteModal from "@/components/modals/DeleteModal";
import {
  useApproveBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useRejectBookingMutation,
} from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/global";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingList = () => {
  const [openDeleteModals, setOpenDeleteModals] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: bookings, isLoading } = useGetAllBookingsQuery(undefined);

  const [deleteBooking] = useDeleteBookingMutation();
  const [approveBooking] = useApproveBookingMutation();
  const [rejectBooking] = useRejectBookingMutation();

  const handleDeleteBooking = async (id: string) => {
    const res = await deleteBooking(id).unwrap();
    if (res.success === true) {
      toast.success("Booking is deleted successfully!!!");
      setOpenDeleteModals((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModals((prev) => ({ ...prev, [id]: true }));
  };

  const handleCloseDeleteModal = (id: string) => {
    setOpenDeleteModals((prev) => ({ ...prev, [id]: false }));
  };

  const handleApproveBooking = async (id: string) => {
    const res = await approveBooking(id).unwrap();
    if (res.success) {
      toast.success(res.message);
    }
  };
  const handleRejectBooking = async (id: string) => {
    const res = await rejectBooking(id).unwrap();
    if (res.success) {
      toast.success(res.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Booking List</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent">
            <tr>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Room Name
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                User Name
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Date
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Time
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Status
              </th>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.data.map((booking: TBooking) => (
              <tr key={booking._id}>
                <td className="py-4 px-4 border-b">{booking.roomName}</td>
                <td className="px-4 border-b">{booking.name}</td>
                <td className="px-4 border-b">{booking.date}</td>
                <td className="px-4 border-b">{booking.time.join(",")}</td>
                <td className="px-4 border-b">
                  <span className="px-2 py-1 bg-accent text-sm rounded-lg">
                    {booking.isConfirmed}
                  </span>
                </td>
                <td className="px-4 border-b">
                  {booking.isRejected ? (
                    <button
                      className={`mr-2 mb-1 md:mb-0 px-2 py-1 
                          bg-primary hover:bg-secondary text-sm text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}
                      onClick={() => handleApproveBooking(booking._id)}
                      disabled={
                        booking.isConfirmed === "confirmed" ||
                        booking.isConfirmed === "cancelled" ||
                        booking.isDeleted
                      }
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRejectBooking(booking._id)}
                      className="mr-2 mb-1 md:mb-0 px-2 py-1 
                          bg-primary hover:bg-secondary text-sm text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={
                        booking.isConfirmed === "confirmed" ||
                        booking.isConfirmed === "cancelled" ||
                        booking.isDeleted
                      }
                    >
                      Reject
                    </button>
                  )}
                  <DeleteModal
                    title={`this booking?`}
                    id={booking._id}
                    method={handleDeleteBooking}
                    isDeleted={booking.isDeleted}
                    isRejected={booking.isRejected}
                    isConfirmed={booking.isConfirmed === "confirmed"}
                    open={openDeleteModals[booking._id] || false}
                    setOpen={(open) =>
                      open
                        ? handleOpenDeleteModal(booking._id)
                        : handleCloseDeleteModal(booking._id)
                    }
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

export default BookingList;
