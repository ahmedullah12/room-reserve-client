import { useGetSingleRoomQuery } from "@/redux/features/rooms/roomsApi";
import { useParams, Link } from "react-router-dom";
import RoomDetailsImageCarousel from "@/components/Rooms/RoomDetailsImageCarouse";

const RoomDetails = () => {
  const { id } = useParams();

  const { data: roomData, isLoading } = useGetSingleRoomQuery(id);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="pt-10 md:pt-20 pb-4 lg:container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <RoomDetailsImageCarousel images={roomData.data.images} />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {roomData.data.name}
            </h2>
            <p className="text-lg mb-2">
              <strong>Room No:</strong> {roomData.data.roomNo}
            </p>
            <p className="text-lg mb-2">
              <strong>Floor No:</strong> {roomData.data.floorNo}
            </p>
            <p className="text-lg mb-2">
              <strong>Capacity:</strong> {roomData.data.capacity} people
            </p>
            <p className="text-lg mb-4">
              <strong>Price Per Slot:</strong> ${roomData.data.pricePerSlot}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary mb-3">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {roomData.data.amenities.map((amenity: string, index: number) => (
                <p
                  key={index}
                  className="py-2 px-3 bg-accent text-primary font-semibold rounded-md"
                >
                  {amenity}
                </p>
              ))}
            </div>
          </div>

          <div>
            <Link to={`/booking/${id}`} className="px-3 py-2 bg-primary text-white rounded-md hover:bg-secondary ">
              Book now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
