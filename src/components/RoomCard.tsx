import { TRoom } from "@/types/global";
import { Link } from "react-router-dom";

type TParam = {
  room: TRoom;
};

const RoomCard = ({ room }: TParam) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-primary">{room.name}</h3>
        <p className="">
          Capacity: <span className="text-primary font-medium">{room.capacity}</span>
        </p>
        <p className="mb-4">
          Price: <span className="text-primary font-medium">${room.pricePerSlot}</span> per slot
        </p>
        <Link to={`/meeting-rooms/${room._id}`} className="bg-primary text-white py-1 px-3 text-[13px] font-semibold rounded-md hover:bg-secondary">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
