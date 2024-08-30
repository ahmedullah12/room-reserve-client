import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import { setBookingInfo } from "@/redux/features/booking/bookingSlice";
import { useGetSingleRoomQuery } from "@/redux/features/rooms/roomsApi";
import { useGetAvailableSlotsQuery } from "@/redux/features/slots/slotsApi";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
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
  const [selectedSlots, setSelectedSlots] = useState<MultiValue<TSelectedOption> | []>(
    []
  );

  const user = useAppSelector(useCurrentUser);
  const {data: roomData, isFetching: roomDataFetching} = useGetSingleRoomQuery(id)
  const {data: userData, isFetching} = useGetUserDataQuery(user?.email);
  // Format date to "YYYY-MM-DD"
  const formattedDate = date?.toLocaleDateString("en-CA");
  const { data: availableSlots } = useGetAvailableSlotsQuery({
    date: formattedDate,
    roomId: id,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const slotsOptions = availableSlots?.data.map((d: TSlot) => ({
    value: d._id,
    label: `${d.startTime}-${d.endTime}`,
  }));

  const handleSlotsValueChange = (selectedOptions: MultiValue<TSelectedOption>) => {
    setSelectedSlots(selectedOptions);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if(selectedSlots.length === 0) return toast.error("Please select a slot.");

    const bookingInfoData = {
      ...data,
      roomId: id,
      roomName: roomData?.data.name,
      date: formattedDate,
      time: slotsOptions?.map((option: TSelectedOption) => option.label),
      cost: roomData?.data.pricePerSlot * slotsOptions.length,
      slots: selectedSlots?.map((option: TSelectedOption) => option.value)
    };
    
    dispatch(setBookingInfo(bookingInfoData))
    navigate("/checkout");
  }


  if(isFetching && roomDataFetching) return <p>Loading..</p>
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar on the left */}
        <div className="lg:flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
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
                borderColor: "#ccc",
                boxShadow: "none",
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
      {
        !isFetching && (
          <div className="mt-8">
        <MyForm defaultValues={userData?.data} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInput width="max-w-[300px]" name="name" label="Name" type="text" />
            <MyInput width="max-w-[300px]" name="email" label="Email" type="email" />
            <MyInput width="max-w-[300px]" name="phone" label="Phone" type="text" />
            <MyInput width="max-w-[300px]" name="address" label="Address" type="text" />
          </div>
          <div className="mt-4 text-center">
            <Button type="submit" className="bg-primary w-full md:w-auto">
              Proceed to Checkout
            </Button>
          </div>
        </MyForm>
      </div>
        )
      }
    </div>
  );
};

export default BookingForm;
