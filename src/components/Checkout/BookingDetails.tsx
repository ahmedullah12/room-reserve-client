import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TBooking } from "@/types/global";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Home,
} from "lucide-react";

const BookingDetails = ({ bookingInfo }: { bookingInfo: TBooking }) => {
  return (
    <div className="lg:w-2/3 space-y-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5 py-3">
          <CardTitle className="text-lg text-primary">
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-3">
            <div className="flex items-center p-2 bg-gray-50 rounded">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Room</p>
                <p className="font-medium text-sm">{bookingInfo?.roomName}</p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded">
              <Clock className="w-5 h-5 text-primary" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Date & Time</p>
                <p className="font-medium text-sm">
                  {bookingInfo?.date} | {bookingInfo?.time.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center p-2 bg-gray-50 rounded">
              <DollarSign className="w-5 h-5 text-primary" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Total Cost</p>
                <p className="font-medium text-sm">
                  ${bookingInfo?.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-primary/5 py-3">
          <CardTitle className="text-lg text-primary">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-3">
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-400" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium text-sm">{bookingInfo?.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-sm">{bookingInfo?.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-sm">{bookingInfo?.phone}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Home className="w-4 h-4 text-gray-400" />
              <div className="ml-3">
                <p className="text-xs text-gray-500">Address</p>
                <p className="font-medium text-sm">{bookingInfo?.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDetails;
