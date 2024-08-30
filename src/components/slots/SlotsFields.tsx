
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TRoom } from "@/types/global";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";

type TOption = {
  value: string;
  label: string;
};

type SlotFieldsProps = {
  room?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  onRoomChange: (value: string) => void;
  onDateChange: (date: Date) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
};

const SlotFields = ({
  room,
  date,
  startTime,
  endTime,
  onRoomChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: SlotFieldsProps) => {
  const { data: roomsData, isLoading } = useGetAllRoomsQuery({});

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );

  useEffect(() => {
    onDateChange(selectedDate as Date);
  }, [selectedDate, onDateChange]);

  const rooms = roomsData?.data.filter(
    (room: TRoom) => room.isDeleted !== true
  );

  const roomsOptions = rooms?.map((room: TRoom) => ({
    value: room._id,
    label: room.name,
  }));

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i + 1).padStart(2, "0");
    return `${hour}:00`;
  });

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="space-y-6 overflow-y-auto">
      {/* Room Selection */}
      <Select onValueChange={onRoomChange} value={room}>
        <SelectTrigger className="w-full max-w-[300px]">
          <SelectValue placeholder="Select Room" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {roomsOptions?.map((opt: TOption, i: number) => (
              <SelectItem key={i} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-[300px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Start Time Selection */}
      <Select onValueChange={onStartTimeChange} value={startTime}>
        <SelectTrigger className="w-full max-w-[300px]">
          <SelectValue placeholder="Select Start Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeOptions.map((time, i) => (
              <SelectItem key={i} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* End Time Selection */}
      <Select onValueChange={onEndTimeChange} value={endTime}>
        <SelectTrigger className="w-full max-w-[300px]">
          <SelectValue placeholder="Select End Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeOptions.map((time, i) => (
              <SelectItem key={i} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SlotFields;
