import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useUpdateSlotMutation } from "@/redux/features/slots/slotsApi";
import toast from "react-hot-toast";
import SlotFields from "../slots/SlotsFields";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type UpdateSlotProps = {
  initialData: {
    _id: string;
    room: { _id: string; name: string };
    date: string;
    startTime: string;
    endTime: string;
    isDeleted: boolean;
  };
};

const UpdateSlot = ({ initialData }: UpdateSlotProps) => {
  const [room, setRoom] = useState(initialData.room._id);
  const [date, setDate] = useState(new Date(initialData.date));
  const [startTime, setStartTime] = useState(initialData.startTime);
  const [endTime, setEndTime] = useState(initialData.endTime);
  const [isOpen, setIsOpen] = useState(false);

  const [updateSlot] = useUpdateSlotMutation();

  const handleSubmit = async () => {
    if (!room || !date || !startTime || !endTime) {
      return toast.error("Please fill in all fields");
    }

    try {
      const slotData = {
        room,
        date: date.toLocaleDateString("en-CA"),
        startTime,
        endTime,
      };
      const res = await updateSlot({
        id: initialData._id,
        payload: slotData,
      }).unwrap();
      if(res.success === true){
        toast.success("Slot updated successfully");
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error("Failed to update slot", error);
      toast.error(error.data.message
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={`mr-2 mb-1 md:mb-0 px-2 py-1 ${
            initialData.isDeleted
              ? "bg-gray-300"
              : "bg-primary hover:bg-secondary"
          } text-sm text-white rounded `}
          disabled={initialData.isDeleted}
        >
          Update
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Slot</DialogTitle>
        <SlotFields
          room={room}
          onRoomChange={setRoom}
          date={date.toISOString()}
          onDateChange={setDate}
          startTime={startTime}
          onStartTimeChange={setStartTime}
          endTime={endTime}
          onEndTimeChange={setEndTime}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSlot;
