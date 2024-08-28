import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";

const CheckoutPage = () => {
  const { bookingInfo } = useAppSelector((state) => state.booking);
  const [paymentMethod, setPaymentMethod] = useState<string>("Pay with Amarpay");

  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();

  // Redirect to home page if bookingInfo is null
  useEffect(() => {
    if (!bookingInfo) {
      navigate("/");
    }
  }, [bookingInfo, navigate]);

  // Handle form submission
  const handleSubmit = async() => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const bookingPayload = {
      date: bookingInfo?.date,
      slots: bookingInfo?.slots,
      room: bookingInfo?.roomId,
      user: bookingInfo?._id,
    }
    console.log(bookingPayload);
    const res = await createBooking(bookingPayload).unwrap();
    console.log(res);
    if(res.data.result === "true"){
      window.location.href = res.data.payment_url
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Booking Summary on the Left Side */}
      <div className="lg:w-2/3 p-6 rounded-md border shadow-md">
        <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
        <p><strong>Room Name:</strong> {bookingInfo?.roomName}</p>
        <p><strong>Date:</strong> {bookingInfo?.date}</p>
        <p><strong>Time:</strong> {bookingInfo?.time.join(", ")}</p>
        <p><strong>Cost:</strong> ${bookingInfo?.cost}</p>
        <h3 className="text-xl font-semibold mt-6">User Info</h3>
        <p><strong>Name:</strong> {bookingInfo?.name}</p>
        <p><strong>Email:</strong> {bookingInfo?.email}</p>
        <p><strong>Phone:</strong> {bookingInfo?.phone}</p>
        <p><strong>Address:</strong> {bookingInfo?.address}</p>
      </div>

      {/* Payment Selection Options on the Right Side */}
      <div className="lg:w-1/3 p-6 rounded-md border shadow-md">
        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center">
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
      </div>
    </div>
  );
};

export default CheckoutPage;
