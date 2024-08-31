import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useCreateSlotMutation } from "@/redux/features/slots/slotsApi";
import toast from "react-hot-toast";
import SlotFields from "../slots/SlotsFields";

const CreateSlot = () => {
  const [room, setRoom] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const [createSlot] = useCreateSlotMutation();

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
      const res = await createSlot(slotData).unwrap();
      if(res.success === true){
        toast.success("Slot created successfully");
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error("Failed to create slot", error);
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary">Create Slot</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-semibold">Create Slot</DialogTitle>
        <SlotFields
          room={room}
          date={date?.toISOString()}
          startTime={startTime}
          endTime={endTime}
          onRoomChange={setRoom}
          onDateChange={setDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
        <Button className="bg-primary w-full max-w-[300px]" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSlot;
