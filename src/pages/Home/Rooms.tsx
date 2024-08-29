import RoomCard from "@/components/Rooms/RoomCard";
import { Button } from "@/components/ui/button";
import { useGetAllRoomsQuery } from "@/redux/features/rooms/roomsApi";
import { TRoom } from "@/types/global";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Rooms = () => {
  const { data: rooms, isFetching } = useGetAllRoomsQuery({});
  const limitedRooms = rooms?.data.slice(0, 4);

  if (isFetching) return <p>Loading...</p>;
  return (
    <div className=" py-20">
      <div className="lg:container mx-auto px-6 md:px-12">
        <h1 className="text-[32px] md:text-[40px] font-bold text-center text-primary mb-8">
          Featured Rooms
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {limitedRooms
            ?.filter((room: TRoom) => !room.isDeleted)
            .map((room: TRoom, index: number) => (
              <RoomCard key={index} room={room} />
            ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/meeting-rooms">
            <Button className="bg-primary flex items-center gap-2 hover:bg-secondary">
              See More <BiRightArrowAlt size={22} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
