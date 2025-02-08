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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type TOption = {
  value: string;
  label: string;
};

type SlotFieldsProps = {
  roomsData: { data: TRoom[] };
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
  roomsData,
  room,
  date,
  startTime,
  endTime,
  onRoomChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: SlotFieldsProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );

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

  return (
    <div className="space-y-6 overflow-y-auto">
      <>
        {/* Room Selection */}
        <Select onValueChange={onRoomChange} value={room}>
          <SelectTrigger className="w-full max-w-[400px]">
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
                "w-full max-w-[400px] justify-start text-left font-normal border-primary border-2",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) onDateChange(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Start Time Selection */}
        <Select onValueChange={onStartTimeChange} value={startTime}>
          <SelectTrigger className="w-full max-w-[400px]">
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
          <SelectTrigger className="w-full max-w-[400px]">
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
      </>
    </div>
  );
};

export default SlotFields;
