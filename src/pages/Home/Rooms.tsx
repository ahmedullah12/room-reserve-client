import RoomCard from "@/components/Rooms/RoomCard";
import { Button } from "@/components/ui/button";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/global";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RoomCardSkeleton from "@/components/Rooms/RoomCardSkeleton";

const Rooms = () => {
  const { data: rooms, isLoading } = useGetAllRoomsQuery({});
  const limitedRooms = rooms?.data.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ bounce: 0.5, duration: 1 }}
      viewport={{ once: true }}
      className=" py-20"
    >
      <div className="lg:container mx-auto px-6 md:px-12">
        <h1 className="text-[28px] md:text-[36px] font-medium text-center">
          Featured Rooms
        </h1>
        <div className="w-full md:w-80 h-[1px] bg-primary mx-auto mt-4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? [...Array(4)].map((_, index) => <RoomCardSkeleton key={index} />)
            : limitedRooms
                ?.filter((room: TRoom) => !room.isDeleted)
                .map((room: TRoom, index: number) => (
                  <RoomCard key={index} room={room} />
                ))}
          {}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/meeting-rooms">
            <Button className="bg-primary flex items-center gap-2 hover:bg-secondary">
              See More <BiRightArrowAlt size={22} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Rooms;
