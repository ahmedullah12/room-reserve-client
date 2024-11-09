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
import { CreditCard, CheckCircle } from "lucide-react";
import Loader from "@/components/Loader";
import { loadStripe } from "@stripe/stripe-js";
import { TError } from "@/types/global";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/Checkout/ConfirmationModal";
import BookingDetails from "@/components/Checkout/BookingDetails";

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useGetSingleBookingQuery(bookingId);
  const bookingInfo = booking?.data;
  const [paymentMethod, setPaymentMethod] = useState("Pay with Amarpay");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmBookingWithAmarpay, { error: aamarPayError }] =
    useConfirmBookingWithAmarpayMutation();
  const [confirmBookingWithStripe, { error: stripeError }] =
    useConfirmBookingWithStripeMutation();

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
      const response = await confirmBookingWithStripe(
        bookingInfo?._id
      ).unwrap();
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

  useEffect(() => {
    const error =
      paymentMethod === "Pay with Amarpay" ? aamarPayError : stripeError;
    if (error) {
      const err = error as TError;
      if (err.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }, [aamarPayError, stripeError, paymentMethod]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-5xl mx-auto px-3">
        <h1 className="text-2xl font-bold text-primary">Checkout</h1>
        <p className="mb-4">
          Please confirm the booking within 30 mins or it will get cancelled.
        </p>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column - Booking Details */}
          <BookingDetails bookingInfo={bookingInfo} />

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
                      <span className="font-medium text-sm">
                        Pay with Amarpay
                      </span>
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
                      <span className="font-medium text-sm">
                        Pay with Stripe
                      </span>
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
          <ConfirmationModal
            bookingInfo={bookingInfo}
            handleCloseModal={handleCloseModal}
          />
        </PaymentConfirmationModal>
      )}
    </div>
  );
};

export default CheckoutPage;
