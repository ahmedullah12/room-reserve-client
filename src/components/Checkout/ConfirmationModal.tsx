import { TBooking } from "@/types/global";
import { Button } from "../ui/button";
import { Calendar, CheckCircle, Clock, DollarSign } from "lucide-react";

const ConfirmationModal = ({bookingInfo, handleCloseModal}: {bookingInfo: TBooking, handleCloseModal: () => void}) => {
  return (
    <div className="p-4 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-3">Booking Confirmed!</h2>
            <div className="space-y-2 text-left bg-gray-50 p-3 rounded mb-4">
              <p className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Room:</span>
                <span className="ml-2">{bookingInfo?.roomName}</span>
              </p>
              <p className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Date & Time:</span>
                <span className="ml-2">
                  {bookingInfo?.date} | {bookingInfo?.time.join(", ")}
                </span>
              </p>
              <p className="flex items-center text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Total Cost:</span>
                <span className="ml-2">${bookingInfo?.totalAmount}</span>
              </p>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Thank you for your booking! We look forward to hosting you.
            </p>
            <Button
              onClick={handleCloseModal}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 text-sm font-medium rounded"
            >
              View My Bookings
            </Button>
          </div>
  );
};

export default ConfirmationModal;