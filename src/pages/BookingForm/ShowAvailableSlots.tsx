import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { TSlot } from "@/types/global";

interface IParams {
  slotsLoading: boolean;
  availableSlots: { data: TSlot[] };
  selectedSlots: string[];
  handleSlotSelect: (slotId: string) => void;
}

const ShowAvailableSlots = ({slotsLoading, availableSlots, selectedSlots, handleSlotSelect}: IParams) => {
  if (slotsLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="flex flex-col items-center gap-2">
          <Loader />
          <p className="text-gray-600">Loading available slots...</p>
        </div>
      </div>
    );
  }

  if (!availableSlots?.data?.length) {
    return (
      <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-center">
          No slots available for the selected date.
          <br />
          Please try selecting a different date.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {availableSlots.data
        .filter((slot: TSlot) => !slot.isBooked)
        .map((slot: TSlot) => (
          <Button
            key={slot._id}
            onClick={() => handleSlotSelect(slot._id)}
            className={`w-full text-sm p-2 transition-colors ${
              selectedSlots.includes(slot._id)
                ? "bg-primary text-white hover:bg-primary/80 hover:text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            variant="ghost"
          >
            {slot.startTime}-{slot.endTime}
          </Button>
        ))}
    </div>
  );
};

export default ShowAvailableSlots;
