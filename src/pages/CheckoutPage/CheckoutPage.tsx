import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  useConfirmBookingWithAmarpayMutation,
  useConfirmBookingWithStripeMutation,
  useGetSingleBookingQuery,
} from "@/redux/features/booking/bookingApi";
import PaymentConfirmationModal from "@/components/modals/PaymentConfirmationModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import Loader from "@/components/Loader";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useGetSingleBookingQuery(bookingId);
  const bookingInfo = booking?.data;
  const [paymentMethod, setPaymentMethod] = useState("Pay with Amarpay");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmBookingWithAmarpay] = useConfirmBookingWithAmarpayMutation();
  const [confirmBookingWithStripe] = useConfirmBookingWithStripeMutation();

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

    if (paymentMethod === "Pay with Amarpay") {
      const res = await confirmBookingWithAmarpay(bookingInfo?._id).unwrap();
      if (res.data.result === "true") {
        window.location.href = res.data.payment_url;
      }
    } else {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
      const response = await confirmBookingWithStripe(bookingInfo?._id).unwrap();
      const result = await stripe?.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result?.error) {
        console.log(result?.error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/my-bookings`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-5xl mx-auto px-3">
        <h1 className="text-2xl font-bold text-primary mb-4">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column - Booking Details */}
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

          {/* Right Column - Payment Options */}
          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader className="bg-primary/5 py-3">
                <CardTitle className="text-lg text-primary">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <label className="flex items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      value="Pay with Amarpay"
                      checked={paymentMethod === "Pay with Amarpay"}
                      onChange={() => setPaymentMethod("Pay with Amarpay")}
                      className="w-3 h-3 text-primary"
                    />
                    <div className="ml-3 flex items-center">
                      <CreditCard className="w-4 h-4 text-primary mr-2" />
                      <span className="font-medium text-sm">Pay with Amarpay</span>
                    </div>
                  </label>

                  <label className="flex items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      value="Pay with Stripe"
                      checked={paymentMethod === "Pay with Stripe"}
                      onChange={() => setPaymentMethod("Pay with Stripe")}
                      className="w-3 h-3 text-primary"
                    />
                    <div className="ml-3 flex items-center">
                      <CreditCard className="w-4 h-4 text-primary mr-2" />
                      <span className="font-medium text-sm">Pay with Stripe</span>
                    </div>
                  </label>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 text-sm font-medium rounded flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <PaymentConfirmationModal open={isModalOpen} onClose={handleCloseModal}>
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
        </PaymentConfirmationModal>
      )}
    </div>
  );
};

export default CheckoutPage;