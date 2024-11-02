import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useGetSingleRoomQuery } from "@/redux/features/rooms/roomsApi";
import { useGetAvailableSlotsQuery } from "@/redux/features/slots/slotsApi";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { TSlot } from "@/types/global";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect, { MultiValue } from "react-select";

type TSelectedOption = {
  value: string;
  label: string;
};

const BookingForm = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<
    MultiValue<TSelectedOption> | []
  >([]);

  const user = useAppSelector(useCurrentUser);
  const { data: roomData, isLoading: roomDataLoading } =
    useGetSingleRoomQuery(id);
  const { data: userData, isLoading } = useGetUserDataQuery(user?.email);
  // Format date to "YYYY-MM-DD"
  const formattedDate = date?.toLocaleDateString("en-CA");
  const { data: availableSlots } = useGetAvailableSlotsQuery({
    date: formattedDate,
    roomId: id,
  });
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();

  const slotsOptions = availableSlots?.data
    .filter((slot: TSlot) => !slot.isBooked) // Filter out booked slots
    .map((slot: TSlot) => ({
      value: slot._id,
      label: `${slot.startTime}-${slot.endTime}`,
    }));

  const handleSlotsValueChange = (
    selectedOptions: MultiValue<TSelectedOption>
  ) => {
    setSelectedSlots(selectedOptions);
  };

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (selectedSlots.length === 0) return toast.error("Please select a slot.");

    const bookingInfoData = {
      userId: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      room: id,
      roomName: roomData?.data.name,
      date: formattedCurrentDate,
      time: selectedSlots?.map((option: TSelectedOption) => option.label),
      totalAmount: roomData?.data.pricePerSlot * selectedSlots.length,
      slots: selectedSlots?.map((option: TSelectedOption) => option.value),
    };

    try {
      const res = await createBooking(bookingInfoData).unwrap();
      if (res.success === true) {
        toast.success("Booking created");
        navigate(`/checkout/${res.data._id}`);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  if (isLoading && roomDataLoading) return <Loader />;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl text-primary font-bold mt-2 mb-4">Make a Booking</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <p className="text-lg font-semibold mb-2">Select a Date</p>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-2 border-primary shadow hover:shadow-lg "
          />
        </div>

        {/* Slots selection on the right */}
        <div className="lg:flex-1">
          <p className="text-lg font-semibold mb-2">Available Slots</p>
          <ReactSelect
            value={selectedSlots}
            onChange={handleSlotsValueChange}
            options={slotsOptions}
            isMulti
            placeholder="Select available slots"
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              control: (base) => ({
                ...base,
                fontSize: "14px",
                border: "2px solid #674188",
                "&:hover": {
                  borderColor: "#888",
                },
              }),
              menu: (base) => ({
                ...base,
                fontSize: "14px",
              }),
            }}
          />
        </div>
      </div>

      {/* Form below calendar and slots */}
      {!isLoading && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Your Information</h3>
          <MyForm defaultValues={userData?.data} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MyInput
                width="max-w-[300px]"
                name="name"
                label="Name"
                type="text"
              />
              <MyInput
                width="max-w-[300px]"
                name="email"
                label="Email"
                type="email"
              />
              <MyInput
                width="max-w-[300px]"
                name="phone"
                label="Phone"
                type="text"
              />
              <MyInput
                width="max-w-[300px]"
                name="address"
                label="Address"
                type="text"
              />
            </div>
              <Button type="submit" className="bg-primary w-full md:w-auto mt-2">
                Proceed to Checkout
              </Button>
          </MyForm>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
