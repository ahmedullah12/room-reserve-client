import { useCancelBookingMutation, useGetMyBookingQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/global";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { data: myBookings, isLoading } = useGetMyBookingQuery(undefined);

  const [cancelBooking] = useCancelBookingMutation();

  const handleCancelBooking = async (id: string) => {
    const res = await cancelBooking(id).unwrap();
    if (res.success === true) {
      toast.success(res.message);
    }
  };

  if (isLoading) return <p>Loading....</p>;

  // Filter out bookings with isConfirmed === "cancelled" or isDeleted === true
  const filteredBookings = myBookings?.data?.filter(
    (booking: TBooking) => booking.isConfirmed !== "cancelled" && !booking.isDeleted && !booking.isRejected 
  );

  return (
    <div className="lg:container px-1">
      <h1 className="mt-4 text-xl md:text-2xl font-bold text-primary">
        All Bookings
      </h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-accent">
            <tr>
              <th className="py-2 px-4 border-b text-start font-semibold text-sm">
                Room Name
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
            {filteredBookings?.map((booking: TBooking) => (
              <tr key={booking._id}>
                <td className="py-4 px-4 border-b">{booking.roomName}</td>
                <td className="px-4 border-b">{booking.date}</td>
                <td className="px-4 border-b">{booking.time.join(", ")}</td>
                <td className="px-4 border-b">
                  <span className="px-2 py-1 bg-accent text-sm rounded-lg">
                    {booking.isConfirmed}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-r">
                  {booking.isConfirmed === "confirmed" ? (
                    <button
                      className={`px-2 py-1 bg-gray-300 rounded text-sm`}
                      disabled
                    >
                      Confirmed
                    </button>
                  ) : (
                    <Link to={`/checkout/${booking._id}`}>
                      <button
                        className={`px-2 py-1 bg-primary text-sm text-white rounded`}
                      >
                        Confirm
                      </button>
                    </Link>
                  )}
                  <button
                    className={`ms-2 mt-1 md:mt-0 px-2 py-1 ${
                      booking.isConfirmed === "confirmed"
                        ? "bg-gray-300 text-black"
                        : "bg-red-500 text-white"
                    } text-sm rounded`}
                    disabled={booking.isConfirmed === "confirmed"}
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel
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

export default MyBookings;
