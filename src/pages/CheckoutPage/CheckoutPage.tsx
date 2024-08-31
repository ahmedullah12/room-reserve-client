import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useConfirmBookingMutation, useGetSingleBookingQuery } from "@/redux/features/booking/bookingApi";
import PaymentConfirmationModal from "@/components/modals/PaymentConfirmationModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, User, Mail, Phone, Home } from "lucide-react";

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading } = useGetSingleBookingQuery(bookingId);
  const bookingInfo = booking?.data;
  const [paymentMethod, setPaymentMethod] = useState<string>("Pay with Amarpay");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmBooking] = useConfirmBookingMutation();

  useEffect(() => {
    if (bookingInfo?.isConfirmed === "confirmed") {
      setIsModalOpen(true);
    }
  }, [bookingInfo, navigate]);

  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const res = await confirmBooking(bookingInfo?._id).unwrap();
    console.log(res);
    if (res.data.result === "true") {
      window.location.href = res.data.payment_url;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/my-bookings`); 
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Booking Summary on the Left Side */}
      <Card className="lg:w-2/3 ps-2 pb-4">
        <CardHeader>
          <CardTitle className="text-primary text-2xl font-bold">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Room:</span>
              <span className="ml-2">{bookingInfo?.roomName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Date:</span>
              <span className="ml-2">{bookingInfo?.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Time:</span>
              <span className="ml-2">{bookingInfo?.time.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Cost:</span>
              <span className="ml-2">${bookingInfo?.totalAmount}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <h3 className="text-xl font-semibold mb-4">User Info</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Name:</span>
              <span className="ml-2">{bookingInfo?.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Email:</span>
              <span className="ml-2">{bookingInfo?.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Phone:</span>
              <span className="ml-2">{bookingInfo?.phone}</span>
            </div>
            <div className="flex items-center">
              <Home className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Address:</span>
              <span className="ml-2">{bookingInfo?.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Selection Options on the Right Side */}
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-primary text-2xl font-bold">Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <label className="flex items-center ">
              <input
                type="radio"
                value="Pay with Amarpay"
                checked={paymentMethod === "Pay with Amarpay"}
                onChange={() => setPaymentMethod("Pay with Amarpay")}
                className="mr-2"
              />
              Pay with Amarpay
            </label>
          </div>
          <Button
            type="button"
            className="bg-primary mt-6"
            onClick={handleSubmit}
          >
            Confirm Booking
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <PaymentConfirmationModal open={isModalOpen} onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
            <p><strong>Room Name:</strong> {bookingInfo?.roomName}</p>
            <p><strong>Date:</strong> {bookingInfo?.date}</p>
            <p><strong>Time:</strong> {bookingInfo?.time.join(", ")}</p>
            <p><strong>Cost:</strong> ${bookingInfo?.totalAmount}</p>
            <p className="mt-4">Thank you for your booking! We look forward to hosting you.</p>
            <Button
              type="button"
              className="w-full bg-primary mt-6"
              onClick={handleCloseModal}
            >
              Go to bookings
            </Button>
          </div>
        </PaymentConfirmationModal>
      )}
    </div>
  );
};

export default CheckoutPage;